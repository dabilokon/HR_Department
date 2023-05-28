using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HR_Department.Models;

namespace HR_Department.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaffsController : ControllerBase
    {
        private readonly HRDepartmentContext _context;

        public StaffsController(HRDepartmentContext context)
        {
            _context = context;
        }

        // GET:api/Staffs/GetByProject/5
        [HttpGet("GetByProject/{ProjectId}")]
        public async Task<ActionResult<IEnumerable<Staff>>> GetStaffsByProject(int ProjectId)
        {
            if (_context.Staffs == null)
            {
                return NotFound();
            }
            return await _context.Staffs.Where(i => i.Projects.Any(im => im.Id == ProjectId)).ToListAsync();
            
        }

        // GET: api/Staffs/
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Staff>>> GetStaffs()
        {
          if (_context.Staffs == null)
          {
              return NotFound();
          }
            return await _context.Staffs.Include(c=>c.Department).ToListAsync();
        }


        // GET: api/Staffs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Staff>> GetStaff(int id)
        {
          if (_context.Staffs == null)
          {
              return NotFound();
          }
            var staff = await _context.Staffs.FindAsync(id);

            if (staff == null)
            {
                return NotFound();
            }

            return staff;
        }

        // StaffDepProj дабивили свой action который соберет таблицу
        // GET: api/Staffs/StaffDepProj
        [HttpGet("StaffDepProj")]
        public async Task<ActionResult<IEnumerable<Staff>>> GetStaffDepProj()
        {
            if (_context.Staffs == null)
            {
                return NotFound();
            }
            return await _context.Staffs
                .Include(c => c.Department)
                .Include(c => c.Projects).ToListAsync();
        }


        // StaffDepProj дабивили свой action который соберет таблицу
        // GET: api/Staffs/AllStaffDepProj
        [HttpGet("AllStaffDepProj")]
        public async Task<ActionResult<IEnumerable<Staff>>> GetAllStaffDepProj()
        {
            if (_context.Staffs == null)
            {
                return NotFound();
            }
            
           return await _context.Staffs
                .FromSql($"SELECT Staffs.*\r\nFROM Staffs\r\nWHERE Staffs.Id IN\r\n(SELECT ProjectStaff.Staffsid\r\nFROM ProjectStaff\r\nGROUP BY ProjectStaff.StaffsId\r\nHAVING COUNT(ProjectStaff.StaffsId)\r\n=\r\n(SELECT COUNT(Projects.id) \r\nFROM Projects))")
                .ToListAsync();

            
        }




        // PUT: api/Staffs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStaff(int id, Staff staff)
        {
            if (id != staff.Id)
            {
                return BadRequest();
            }

            _context.Entry(staff).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StaffExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Staffs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Staff>> PostStaff(Staff staff)
        {
          if (_context.Staffs == null)
          {
              return Problem("Entity set 'HRDepartmentContext.Staffs'  is null.");
          }
            _context.Staffs.Add(staff);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStaff", new { id = staff.Id }, staff);
        }

        // DELETE: api/Staffs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStaff(int id)
        {
            if (_context.Staffs == null)
            {
                return NotFound();
            }
            var staff = await _context.Staffs.FindAsync(id);
            if (staff == null)
            {
                return NotFound();
            }

            _context.Staffs.Remove(staff);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StaffExists(int id)
        {
            return (_context.Staffs?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

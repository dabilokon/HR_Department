using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HR_Department.Models;
using System.Text.RegularExpressions;

namespace HR_Department.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly HRDepartmentContext _context;

        public ProjectsController(HRDepartmentContext context)
        {
            _context = context;
        }

        //Наш action -->  api/Projects/addStaff
        [HttpPost("addStaff")]
        public async Task<ActionResult<Project>> PostAddStaffToProject([FromBody] AddStaffToProjectDTO model)
        {
            Project project = await _context.Projects.FindAsync(model.ProjectId);
            Staff staff = await _context.Staffs.FindAsync(model.StaffId);
            

            if (staff == null||!ProjectExists(model.ProjectId)) 
            {
                return NotFound();
            }

            

          /*  if (project.Staffs.FindIndex()>-1) 
            { 
                return NoContent();
            }*/

            project.Staffs.Add(staff);

            _context.Entry(project).State = EntityState.Modified;

            await _context.SaveChangesAsync();
                       
            return NoContent();



        }


        // GET: api/Projects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
          if (_context.Projects == null)
          {
              return NotFound();
          }
            return await _context.Projects.ToListAsync();
        }

        // GET: api/Projects/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProject(int id)
        {
          if (_context.Projects == null)
          {
              return NotFound();
          }
            var project = await _context.Projects.FindAsync(id);


            if (project == null)
            {
                return NotFound();
            }

            return project;
        }


        // PUT: api/Projects/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProject(int id, Project project)
        {
            if (id != project.Id)
            {
                return BadRequest();
            }

            _context.Entry(project).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectExists(id))
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

        // POST: api/Projects
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Project>> PostProject(Project project)
        {
          if (_context.Projects == null)
          {
              return Problem("Entity set 'HRDepartmentContext.Projects'  is null.");
          }
            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProject", new { id = project.Id }, project);
        }

        // DELETE: api/Projects/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            if (_context.Projects == null)
            {
                return NotFound();
            }
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProjectExists(int id)
        {
            return (_context.Projects?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

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
    public class ProblemsController : ControllerBase
    {
        private readonly HRDepartmentContext _context;

        public ProblemsController(HRDepartmentContext context)
        {
            _context = context;
        }

        // GET: api/Problems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Problem>>> GetProblems()
        {
          if (_context.Problems == null)
          {
              return NotFound();
          }
            return await _context.Problems.ToListAsync();
        }

        // GET: api/Problems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Problem>> GetProblem(int id)
        {
          if (_context.Problems == null)
          {
              return NotFound();
          }
            var problem = await _context.Problems.FindAsync(id);

            if (problem == null)
            {
                return NotFound();
            }

            return problem;
        }

        // PUT: api/Problems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProblem(int id, Problem problem)
        {
            if (id != problem.Id)
            {
                return BadRequest();
            }

            _context.Entry(problem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProblemExists(id))
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

        // POST: api/Problems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Problem>> PostProblem(Problem problem)
        {
          if (_context.Problems == null)
          {
              return Problem("Entity set 'HRDepartmentContext.Problems'  is null.");
          }
            _context.Problems.Add(problem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProblem", new { id = problem.Id }, problem);
        }

        // DELETE: api/Problems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProblem(int id)
        {
            if (_context.Problems == null)
            {
                return NotFound();
            }
            var problem = await _context.Problems.FindAsync(id);
            if (problem == null)
            {
                return NotFound();
            }

            _context.Problems.Remove(problem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProblemExists(int id)
        {
            return (_context.Problems?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

using LMS.Assessment.Api.Dtos;
using LMS.Assessment.Api.Entities;
using LMS.Assessment.Api.Enums;
using LMS.Assessment.Api.Helpers;
using LMS.Assessment.Api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace LMS.Assessment.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class LawFirmsController(IRepository<LawFirm> repository) : ControllerBase
{
    private readonly IRepository<LawFirm> _repository = repository;

    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20,
        [FromQuery] SortOrder sortOrder = SortOrder.asc,
        [FromQuery] SortBy sortBy = SortBy.createdAt
        )
    {
        var result = await _repository.GetAllAsync(pageNumber, pageSize, sortOrder, sortBy);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var lawFirm = await _repository.GetByIdAsync(id);
        return lawFirm is null ? NotFound() : Ok(lawFirm);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateLawFirmRequest lawFirm)
    {
        if (Request.GetUserId() is not Guid userId)
            return Unauthorized("User ID is missing from the request.");

        var entity = lawFirm.ToEntity(userId);
        var created = await _repository.CreateAsync(entity);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }
}

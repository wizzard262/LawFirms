using LMS.Assessment.Api.Abstractions;
using LMS.Assessment.Api.Enums;

namespace LMS.Assessment.Api.Repositories;

public interface IRepository<T>
{
    Task<PaginatedList<T>> GetAllAsync(
        int pageNumber,
        int pageSize,
        SortOrder sortOrder,
        SortBy sortBy
    );
    Task<T?> GetByIdAsync(Guid id);
    Task<T?> CreateAsync(T entity);
}
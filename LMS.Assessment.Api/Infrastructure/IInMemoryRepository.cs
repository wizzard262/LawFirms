using LMS.Assessment.Api.Abstractions;

namespace LMS.Assessment.Api.Infrastructure
{
    public interface IInMemoryRepository<T> where T : IEntity
    {
        Task<T> CreateAsync(T entity);
        Task<PaginatedList<T>> GetAllAsync(int pageNumber = 1, int pageSize = 20, string sortOrder = "asc", string sortBy = "createdAt");
        Task<T?> GetByIdAsync(Guid id);
        Task<T> UpdateAsync(T entity);
    }
}
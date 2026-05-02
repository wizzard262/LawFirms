using LMS.Assessment.Api.Abstractions;
using LMS.Assessment.Api.Enums;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Concurrent;

namespace LMS.Assessment.Api.Infrastructure;

public class InMemoryRepository<T> where T : IEntity
{
    private readonly ConcurrentDictionary<Guid, T> _store = new();

    public async Task<T?> GetByIdAsync(Guid id)
    {
        _store.TryGetValue(id, out var entity);
        await SimulateDbOperation();
        return entity;
    }

    public async Task<PaginatedList<T>> GetAllAsync(
        int pageNumber,
        int pageSize,
        SortOrder sortOrder,
        SortBy sortBy
        )
    {
        if (pageNumber < 1)
        {
            throw new ArgumentOutOfRangeException(nameof(pageNumber), "Page number must be at least 1.");
        }

        if (pageSize < 1)
        {
            throw new ArgumentOutOfRangeException(nameof(pageSize), "Page size must be at least 1.");
        }

        var all = _store.Values.AsQueryable();

        var items = (sortBy, sortOrder) switch
        {
            (SortBy.id, SortOrder.asc) => all.OrderBy(x => x.Id),
            (SortBy.id, SortOrder.desc) => all.OrderByDescending(x => x.Id),
            (SortBy.createdAt, SortOrder.asc) => all.OrderBy(x => x.CreatedAt),
            (SortBy.createdAt, SortOrder.desc) => all.OrderByDescending(x => x.CreatedAt),
            _ => all
        };

        await SimulateDbOperation();
        return new PaginatedList<T>(
            [.. items.Skip((pageNumber - 1) * pageSize).Take(pageSize)],
            items.Count(),
            pageNumber,
            pageSize);
    }

    public async Task<T> CreateAsync(T entity)
    {
        if (!_store.TryAdd(entity.Id, entity))
        {
            throw new InvalidOperationException($"An entity with id '{entity.Id}' already exists.");
        }
        await SimulateDbOperation();
        return entity;
    }

    private static async Task SimulateDbOperation()
    {
        // Simulate some latency to mimic a real database operation
        await Task.Delay(new Random().Next(40, 80));
    }
}

using Bogus;
using LMS.Assessment.Api.Entities;
using LMS.Assessment.Api.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader());
});

builder.Services.AddSingleton(typeof(IRepository<>), typeof(InMemoryRepository<>));
builder.Services.AddControllers();
builder.Services.AddOpenApi(); // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi

var app = builder.Build();

var repo = app.Services.GetRequiredService<IRepository<LawFirm>>();
foreach (var firm in GenerateFakeLawFirms())
{
    await repo.CreateAsync(firm);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();


//ste:todo: Move this to a separate class and make it more generic (e.g. GenerateFakeEntities<T> with a custom instantiator func)
LawFirm[] GenerateFakeLawFirms()
{
    var lawFirmFaker = new Faker<LawFirm>("en_GB")
        .CustomInstantiator(f => new LawFirm(
            Guid.NewGuid(),
            f.Company.CompanyName(),
            f.Address.FullAddress(),
            f.Phone.PhoneNumber(),
            f.Internet.Email(),
            Guid.NewGuid())
        {
            CreatedAt = f.Date.Past(1)
        });

    var lawFirms = lawFirmFaker.Generate(50).ToArray();

    // Use a 'with' expression to produce a new record with a specific Id (respects init-only semantics)
    lawFirms[0] = lawFirms[0] with { Id = Guid.Parse("689b46a1-e886-4f6e-98a6-cbb53232a2e3") };

    return lawFirms;
}
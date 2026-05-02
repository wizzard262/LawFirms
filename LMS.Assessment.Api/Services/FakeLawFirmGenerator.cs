using Bogus;
using LMS.Assessment.Api.Entities;

namespace LMS.Assessment.Api.Services;

public static class FakeLawFirmGenerator
{
    public static LawFirm[] GenerateFakeLawFirms()
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
}

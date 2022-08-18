dotnet ef dbcontext scaffold `
"Server=localhost;Port=5433;Database=postgres;User Id=postgres;Password=f5da15f2addf6857266afd80d19bd20da241f8bf334af04f" `
"Npgsql.EntityFrameworkCore.PostgreSQL" `
--context-dir .\BlogContext `
-o .\Models `
--force
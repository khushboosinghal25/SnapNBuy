# Use official .NET SDK image for build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copy csproj and restore
COPY *.sln ./
COPY back-end/*.csproj ./back-end/
RUN dotnet restore ./back-end/back-end.csproj

# Copy all files and build
COPY back-end/. ./back-end/
WORKDIR /app/back-end
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/back-end/out ./

# Expose port and set entrypoint
EXPOSE 80
ENTRYPOINT ["dotnet", "back-end.dll"]

FROM mcr.microsoft.com/dotnet/sdk:6.0
COPY . /asp-net-project
WORKDIR /asp-net-project
RUN [ "dotnet", "publish","--configuration","Release"]
CMD [ "dotnet", "./bin/Release/net6.0/publish/aspnetcore.dll"]
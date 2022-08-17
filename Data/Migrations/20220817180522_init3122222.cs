using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    public partial class init3122222 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Product_Favourites_FavouritesId",
                table: "Product");

            migrationBuilder.DropIndex(
                name: "IX_Product_FavouritesId",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "FavouritesId",
                table: "Product");

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "Favourites",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "Favourites");

            migrationBuilder.AddColumn<int>(
                name: "FavouritesId",
                table: "Product",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Product_FavouritesId",
                table: "Product",
                column: "FavouritesId");

            migrationBuilder.AddForeignKey(
                name: "FK_Product_Favourites_FavouritesId",
                table: "Product",
                column: "FavouritesId",
                principalTable: "Favourites",
                principalColumn: "Id");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    public partial class init312222 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CartId",
                table: "Product",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FavouritesId",
                table: "Product",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Product_CartId",
                table: "Product",
                column: "CartId");

            migrationBuilder.CreateIndex(
                name: "IX_Product_FavouritesId",
                table: "Product",
                column: "FavouritesId");

            migrationBuilder.AddForeignKey(
                name: "FK_Product_Cart_CartId",
                table: "Product",
                column: "CartId",
                principalTable: "Cart",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Product_Favourites_FavouritesId",
                table: "Product",
                column: "FavouritesId",
                principalTable: "Favourites",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Product_Cart_CartId",
                table: "Product");

            migrationBuilder.DropForeignKey(
                name: "FK_Product_Favourites_FavouritesId",
                table: "Product");

            migrationBuilder.DropIndex(
                name: "IX_Product_CartId",
                table: "Product");

            migrationBuilder.DropIndex(
                name: "IX_Product_FavouritesId",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "CartId",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "FavouritesId",
                table: "Product");
        }
    }
}

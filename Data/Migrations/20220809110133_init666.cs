using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    public partial class init666 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Gender",
                table: "Variants");

            migrationBuilder.AddColumn<int>(
                name: "Gender",
                table: "Product",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Gender",
                table: "Product");

            migrationBuilder.AddColumn<int>(
                name: "Gender",
                table: "Variants",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}

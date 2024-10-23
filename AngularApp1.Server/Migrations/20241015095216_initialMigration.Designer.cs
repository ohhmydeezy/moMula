﻿// <auto-generated />
using System;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace AngularApp1.Server.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20241015095216_initialMigration")]
    partial class initialMigration
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("API.Entities.AppUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("MonthlyIncome")
                        .HasColumnType("int");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<int>("Savings")
                        .HasColumnType("int");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("AngularApp1.Server.Entities.UserCard", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<decimal>("AccountBalance")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("AccountName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("AppUserId")
                        .HasColumnType("int");

                    b.Property<string>("CardImage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("OpeningBalance")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.HasIndex("AppUserId");

                    b.ToTable("Cards");
                });

            modelBuilder.Entity("AngularApp1.Server.Entities.UserTransactions", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<decimal>("BalanceChange")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Month")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("UserCardId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserCardId");

                    b.ToTable("Transactions");
                });

            modelBuilder.Entity("AngularApp1.Server.Entities.UserCard", b =>
                {
                    b.HasOne("API.Entities.AppUser", null)
                        .WithMany("Cards")
                        .HasForeignKey("AppUserId");
                });

            modelBuilder.Entity("AngularApp1.Server.Entities.UserTransactions", b =>
                {
                    b.HasOne("AngularApp1.Server.Entities.UserCard", null)
                        .WithMany("Transactions")
                        .HasForeignKey("UserCardId");
                });

            modelBuilder.Entity("API.Entities.AppUser", b =>
                {
                    b.Navigation("Cards");
                });

            modelBuilder.Entity("AngularApp1.Server.Entities.UserCard", b =>
                {
                    b.Navigation("Transactions");
                });
#pragma warning restore 612, 618
        }
    }
}

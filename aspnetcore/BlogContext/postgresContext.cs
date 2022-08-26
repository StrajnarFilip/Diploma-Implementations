using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using aspnetcore.Models;

namespace aspnetcore.BlogContext
{
    public partial class postgresContext : DbContext
    {

        public static postgresContext DefaultContext => new postgresContext();
        public postgresContext()
        {
        }

        public postgresContext(DbContextOptions<postgresContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Comment> Comments { get; set; } = null!;
        public virtual DbSet<Post> Posts { get; set; } = null!;
        public virtual DbSet<Segment> Segments { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                // #warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseNpgsql("Server=localhost;Port=5433;Database=postgres;User Id=postgres;Password=f5da15f2addf6857266afd80d19bd20da241f8bf334af04f");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Comment>(entity =>
            {
                entity.HasKey(e => e.Idcomment)
                    .HasName("comment_pkey");

                entity.ToTable("comment");

                entity.Property(e => e.Idcomment).HasColumnName("idcomment");

                entity.Property(e => e.Content).HasColumnName("content");

                entity.Property(e => e.PostIdpost).HasColumnName("post_idpost");

                entity.Property(e => e.UserIduser).HasColumnName("user_iduser");

                entity.HasOne(d => d.PostIdpostNavigation)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.PostIdpost)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("commentpost");

                entity.HasOne(d => d.UserIduserNavigation)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.UserIduser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("commentuser");
            });

            modelBuilder.Entity<Post>(entity =>
            {
                entity.HasKey(e => e.Idpost)
                    .HasName("post_pkey");

                entity.ToTable("post");

                entity.Property(e => e.Idpost).HasColumnName("idpost");

                entity.Property(e => e.Title).HasColumnName("title");
            });

            modelBuilder.Entity<Segment>(entity =>
            {
                entity.HasKey(e => e.Idsegment)
                    .HasName("segment_pkey");

                entity.ToTable("segment");

                entity.Property(e => e.Idsegment).HasColumnName("idsegment");

                entity.Property(e => e.PostIdpost).HasColumnName("post_idpost");

                entity.Property(e => e.Source).HasColumnName("source");

                entity.Property(e => e.Text).HasColumnName("text");

                entity.Property(e => e.Type).HasColumnName("type");

                entity.HasOne(d => d.PostIdpostNavigation)
                    .WithMany(p => p.Segments)
                    .HasForeignKey(d => d.PostIdpost)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("segmentpost");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Iduser)
                    .HasName("user_pkey");

                entity.ToTable("user");

                entity.Property(e => e.Iduser).HasColumnName("iduser");

                entity.Property(e => e.Cookie).HasColumnName("cookie");

                entity.Property(e => e.Email).HasColumnName("email");

                entity.Property(e => e.Password).HasColumnName("password");

                entity.Property(e => e.Role).HasColumnName("role");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

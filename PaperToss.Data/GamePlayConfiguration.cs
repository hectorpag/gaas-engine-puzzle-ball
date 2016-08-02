
// <auto-generated>
// ReSharper disable ConvertPropertyToExpressionBody
// ReSharper disable DoNotCallOverridableMethodsInConstructor
// ReSharper disable InconsistentNaming
// ReSharper disable PartialMethodWithSinglePart
// ReSharper disable PartialTypeWithSinglePart
// ReSharper disable RedundantNameQualifier
// ReSharper disable RedundantOverridenMember
// ReSharper disable UseNameofExpression
// TargetFrameworkVersion = 4.61
#pragma warning disable 1591    //  Ignore "Missing XML Comment" warning

namespace PaperToss.Data
{

    using PaperToss.Model;


    // GamePlay

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.20.1.0")]
    public partial class GamePlayConfiguration : System.Data.Entity.ModelConfiguration.EntityTypeConfiguration<GamePlay>
    {
        public GamePlayConfiguration()
            : this("dbo")
        {
        }

        public GamePlayConfiguration(string schema)
        {

            ToTable(schema + ".GamePlay");

            HasKey(x => x.Id);


            Property(x => x.Id).HasColumnName(@"ID").IsRequired().HasColumnType("int").HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity);

            Property(x => x.ConsumerId).HasColumnName(@"Consumer_ID").IsRequired().HasColumnType("int");

            Property(x => x.FuelId).HasColumnName(@"Fuel_ID").IsRequired().HasColumnType("int");

            Property(x => x.LevelPlayed).HasColumnName(@"LevelPlayed").IsRequired().HasColumnType("int");

            Property(x => x.PlayedDate).HasColumnName(@"PlayedDate").IsRequired().HasColumnType("datetime");

            Property(x => x.Score).HasColumnName(@"Score").IsRequired().HasColumnType("decimal").HasPrecision(18,3);

            Property(x => x.ScoreTime).HasColumnName(@"ScoreTime").IsRequired().HasColumnType("int");



            // Foreign keys


            HasRequired(a => a.Consumer).WithMany(b => b.GamePlays).HasForeignKey(c => c.ConsumerId).WillCascadeOnDelete(false); // FK_GamePlay_Consumer

            HasRequired(a => a.Fuel).WithMany(b => b.GamePlays).HasForeignKey(c => c.FuelId).WillCascadeOnDelete(false); // FK_GamePlay_Fuel



            InitializePartial();
        }

        partial void InitializePartial();
    }



}
// </auto-generated>

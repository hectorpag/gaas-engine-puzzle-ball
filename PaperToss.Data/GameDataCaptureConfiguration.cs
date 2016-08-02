
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


    // GameDataCapture

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.20.1.0")]
    public partial class GameDataCaptureConfiguration : System.Data.Entity.ModelConfiguration.EntityTypeConfiguration<GameDataCapture>
    {
        public GameDataCaptureConfiguration()
            : this("dbo")
        {
        }

        public GameDataCaptureConfiguration(string schema)
        {

            ToTable(schema + ".GameDataCapture");

            HasKey(x => x.Id);


            Property(x => x.Id).HasColumnName(@"ID").IsRequired().HasColumnType("int").HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity);

            Property(x => x.ConsumerId).HasColumnName(@"Consumer_ID").IsRequired().HasColumnType("int");

            Property(x => x.Start).HasColumnName(@"Start").IsOptional().HasColumnType("bigint");

            Property(x => x.Finished).HasColumnName(@"Finished").IsOptional().IsUnicode(false).HasColumnType("varchar");

            Property(x => x.CreatedOn).HasColumnName(@"CreatedOn").IsRequired().HasColumnType("datetime");




            InitializePartial();
        }

        partial void InitializePartial();
    }



}
// </auto-generated>

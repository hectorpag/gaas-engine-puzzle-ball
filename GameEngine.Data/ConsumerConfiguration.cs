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

namespace GameEngine.Data
{
    using GameEngine.Model;

    // Consumer
    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.20.1.0")]
    public partial class ConsumerConfiguration : System.Data.Entity.ModelConfiguration.EntityTypeConfiguration<Consumer>
    {
        public ConsumerConfiguration()
            : this("dbo")
        {
        }

        public ConsumerConfiguration(string schema)
        {
            ToTable(schema + ".Consumer");
            HasKey(x => x.Id);

            Property(x => x.Id).HasColumnName(@"ID").IsRequired().HasColumnType("int").HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity);
            Property(x => x.GaasCampaignKey).HasColumnName(@"Gaas_CampaignKey").IsRequired().IsUnicode(false).HasColumnType("varchar").HasMaxLength(128);
            Property(x => x.GaasConsumerId).HasColumnName(@"Gaas_ConsumerId").IsRequired().HasColumnType("int");
            Property(x => x.GaasConsumerName).HasColumnName(@"Gaas_ConsumerName").IsOptional().IsUnicode(false).HasColumnType("varchar").HasMaxLength(500);
            Property(x => x.GaasGender).HasColumnName(@"Gaas_Gender").IsOptional().IsUnicode(false).HasColumnType("varchar").HasMaxLength(50);
            InitializePartial();
        }
        partial void InitializePartial();
    }

}
// </auto-generated>
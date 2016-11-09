SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[GameDashboard] 
	 @consumerID int 
    ,@campaignKey VarChar(128)
	,@StartDate datetime null
AS
BEGIN
	SET NOCOUNT ON;

    DECLARE @BestScore int ;
	
	
   ;WITH b as(
		SELECT a.BestScore,a.Gaas_ConsumerId, ROW_NUMBER() OVER (ORDER BY BestScore desc) LeaderBoardPosition  FROM (
			SELECT
				s.[Result] as BestScore
				,c.Gaas_ConsumerId
				,RANK () over (PARTITION BY  c.Gaas_ConsumerId order by s.[Result] desc ) As Ranking
			FROM [dbo].[Scores] s
			INNER JOIN [dbo].[Consumer] c ON c.ID = s.Consumer_ID AND c.Gaas_CampaignKey = @campaignKey  AND ((@StartDate  IS NOT NULL AND  s.Scored >= @StartDate) OR  @StartDate  IS NULL )
		)  a
		WHERE a.Ranking = 1 

	)
	
	SELECT b.BestScore as BestScore,b.LeaderBoardPosition FROM b where b.Gaas_ConsumerId = @consumerId
END



GO

BEGIN TRANSACTION
SET QUOTED_IDENTIFIER ON
SET ARITHABORT ON
SET NUMERIC_ROUNDABORT OFF
SET CONCAT_NULL_YIELDS_NULL ON
SET ANSI_NULLS ON
SET ANSI_PADDING ON
SET ANSI_WARNINGS ON
COMMIT
BEGIN TRANSACTION
GO
ALTER TABLE dbo.Consumer ADD CONSTRAINT
	IX_Consumer UNIQUE NONCLUSTERED 
	(
	Gaas_CampaignKey,
	Gaas_ConsumerId
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.Consumer SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
GO



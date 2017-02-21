-- 20 Feb 2017
ALTER TABLE [dbo].[Consumer] DROP CONSTRAINT [IX_Consumer]
GO

ALTER TABLE [dbo].[Consumer] ALTER COLUMN Gaas_ConsumerId VARCHAR(450) NOT NULL
GO

ALTER TABLE [dbo].[Consumer] ADD  CONSTRAINT [IX_Consumer] UNIQUE NONCLUSTERED 
(
	[Gaas_CampaignKey] ASC,
	[Gaas_ConsumerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) 
GO
-- 20 Feb 2017
--21 Feb 2017
ALTER PROCEDURE [dbo].[GameDashboard] 
	 @consumerID varchar(max) 
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

--21 Feb 2017
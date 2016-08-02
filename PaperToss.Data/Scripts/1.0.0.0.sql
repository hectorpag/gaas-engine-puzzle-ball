CREATE TABLE [dbo].[Consumer](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Gaas_CampaignKey] [varchar](128) NOT NULL,
	[Gaas_ConsumerId] [int] NOT NULL,
	[Gaas_ConsumerName] [varchar](500) NULL,
 CONSTRAINT [PK_Consumer] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Fuel]    Script Date: 21/07/2016 1:41:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Fuel](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Consumer_ID] [int] NOT NULL,
	[Created] [datetime] NOT NULL,
	[UtilizedDate] [datetime] NULL,
	[AutoDiscard] [bit] NOT NULL,
 CONSTRAINT [PK_Fuel] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[GamePlay]    Script Date: 21/07/2016 1:41:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GamePlay](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Consumer_ID] [int] NOT NULL,
	[Fuel_ID] [int] NOT NULL,
	[LevelPlayed] [int] NOT NULL,
	[PlayedDate] [datetime] NOT NULL,
	[Score] [decimal](18, 3) NOT NULL,
	[ScoreTime] [int] NOT NULL,
 CONSTRAINT [PK_GamePlay] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  View [dbo].[GamePlayView]    Script Date: 21/07/2016 1:41:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[GamePlayView] AS

WITH Game as (
	SELECT 
		a.Fuel_ID
		,Sum(a.Score) as TotalScore
		,Sum(a.ScoreTime) as TotalScoreTime
		,Count(a.Fuel_ID) as FuelCount
	FROM (

			SELECT 
			ID,
				Fuel_ID,
				LevelPlayed,
				PlayedDate ,
				Score,
				ScoreTime,
				RANK () over (PARTITION BY  Fuel_ID,LevelPlayed order by ID asc ) As Ranking
			FROM GamePlay  
			--WHERE LevelPlayed in (1,2,3) --AND Fuel_ID = 1072 -- AND Ranking = 1
	)  as a
	WHERE a.Ranking = 1  
	GROUP By a.Fuel_ID
	--HAVING Count(a.Fuel_ID) =3

  )
SELECT       
c.[ID] as ConsumerID
--  ,c.[Gaas_CampaignKey]
,c.[Gaas_ConsumerId]
,c.[Gaas_ConsumerName]
,f.[ID] as FuelID
,f.[Created]
,f.[UtilizedDate]
,f.[Consumer_ID]
,g.[ID] as GamePlayID
,g.[LevelPlayed]
,g.[PlayedDate]
,g.[Score]
,g.ScoreTime
,ga.TotalScore
FROM            dbo.Consumer c
INNER JOIN               dbo.Fuel f ON c.ID = f.Consumer_ID 
INNER JOIN            dbo.GamePlay g ON f.ID = g.Fuel_ID
LEFT JOIN Game ga ON ga.Fuel_ID = f.ID 



GO
/****** Object:  View [dbo].[UniqueGamePlayView]    Script Date: 21/07/2016 1:41:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE VIEW [dbo].[UniqueGamePlayView] AS

SELECT 
		 a.Consumer_ID
		,a.Fuel_ID
		,a.ID as GamePlayID		
		,a.LevelPlayed
		,a.PlayedDate 
		,a.Score
		,a.ScoreTime
FROM (

			SELECT 
			ID,
			Consumer_ID,
				Fuel_ID,
				LevelPlayed,
				PlayedDate ,
				Score,
				ScoreTime,
				RANK () over (PARTITION BY  Fuel_ID,LevelPlayed order by ID asc ) As Ranking
			FROM GamePlay 
			
)  as a
WHERE a.Ranking = 1  
GROUP By a.Fuel_ID,a.ID,a.LevelPlayed,a.PlayedDate,a.Score,a.ScoreTime,a.Consumer_ID



GO
/****** Object:  Table [dbo].[Config]    Script Date: 21/07/2016 1:41:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Config](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Gaas_CampaignKey] [varchar](128) NOT NULL,
	[Gaas_PanelId] [int] NOT NULL,
	[ShowMenu] [bit] NOT NULL,
	[ShowResult] [bit] NOT NULL,
	[LevelNumber] [int] NULL,
	[CutOffScore] [int] NULL,
	[FBShare_Score1_Low] [int] NULL,
	[FBShare_Score1_High] [int] NULL,
	[FBShare_Score1_Msg] [varchar](500) NULL,
	[FBShare_Score2_Low] [int] NULL,
	[FBShare_Score2_High] [int] NULL,
	[FBShare_Score2_Msg] [varchar](500) NULL,
	[FBShare_Score3_Low] [int] NULL,
	[FBShare_Score3_High] [int] NULL,
	[FBShare_Score3_Msg] [varchar](500) NULL,
	[FBShare_Score4_Low] [int] NULL,
	[FBShare_Score4_High] [int] NULL,
	[FBShare_Score4_Msg] [varchar](500) NULL
) ON [PRIMARY] 
SET ANSI_PADDING OFF
ALTER TABLE [dbo].[Config] ADD [CustomText] [varchar](100) NULL
 CONSTRAINT [PK_Config] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Scores]    Script Date: 21/07/2016 1:41:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Scores](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Consumer_ID] [int] NULL,
	[Scored] [datetime] NOT NULL,
	[Result] [int] NOT NULL,
 CONSTRAINT [PK_Scores] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[Config] ADD  CONSTRAINT [DF_Config_ShowMenu]  DEFAULT ((0)) FOR [ShowMenu]
GO
ALTER TABLE [dbo].[Config] ADD  CONSTRAINT [DF_Config_ShowResult]  DEFAULT ((0)) FOR [ShowResult]
GO
ALTER TABLE [dbo].[Fuel] ADD  CONSTRAINT [DF_Fuel_Consumption]  DEFAULT ((0)) FOR [Consumer_ID]
GO
ALTER TABLE [dbo].[Fuel] ADD  CONSTRAINT [DF_Fuel_AutoDiscard]  DEFAULT ((0)) FOR [AutoDiscard]
GO
ALTER TABLE [dbo].[GamePlay]  WITH CHECK ADD  CONSTRAINT [FK_GamePlay_Consumer] FOREIGN KEY([Consumer_ID])
REFERENCES [dbo].[Consumer] ([ID])
GO
ALTER TABLE [dbo].[GamePlay] CHECK CONSTRAINT [FK_GamePlay_Consumer]
GO
ALTER TABLE [dbo].[GamePlay]  WITH CHECK ADD  CONSTRAINT [FK_GamePlay_Fuel] FOREIGN KEY([Fuel_ID])
REFERENCES [dbo].[Fuel] ([ID])
GO
ALTER TABLE [dbo].[GamePlay] CHECK CONSTRAINT [FK_GamePlay_Fuel]
GO
ALTER TABLE [dbo].[Scores]  WITH CHECK ADD  CONSTRAINT [FK_Scores_Consumer] FOREIGN KEY([Consumer_ID])
REFERENCES [dbo].[Consumer] ([ID])
GO
ALTER TABLE [dbo].[Scores] CHECK CONSTRAINT [FK_Scores_Consumer]
GO

ALTER TABLE dbo.Config ADD
	FBShare_Name varchar(500) NULL,
	FBShare_Caption varchar(500) NULL
GO


ALTER TABLE dbo.Config ADD
	FBShare_Url [varchar](500) NULL,
	FBShare_Score1_ImgUrl [varchar](500) NULL,
	FBShare_Score2_ImgUrl [varchar](500) NULL,
	FBShare_Score3_ImgUrl [varchar](500) NULL,
	FBShare_Score4_ImgUrl [varchar](500) NULL
GO

ALTER TABLE dbo.Consumer ADD
	Gaas_Gender varchar(50) NULL

GO


CREATE TABLE [dbo].[GameDataCapture](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Consumer_ID] [int] NOT NULL,
	[Start] [bigint] NULL,
	[Finished] [varchar](max) NULL,
	[CreatedOn] [datetime] NOT NULL,
 CONSTRAINT [PK_GameDataCapture] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[GameDataCapture] ADD  CONSTRAINT [DF_GameDataCapture_CreatedOn]  DEFAULT (getutcdate()) FOR [CreatedOn]
GO



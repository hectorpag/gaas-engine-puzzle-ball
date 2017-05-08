CREATE TABLE [dbo].[GameEventData](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Consumer_ID] [int] NOT NULL,
	[Fuel_ID] [int] NOT NULL,
    [EventDate] [datetime] NOT NULL,
	[DataJson] [varchar](2000) NULL,
 CONSTRAINT [PK_GameEventData] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[GameEventData]  WITH CHECK ADD  CONSTRAINT [FK_GameEventData_Consumer] FOREIGN KEY([Consumer_ID])
REFERENCES [dbo].[Consumer] ([ID])
GO

ALTER TABLE [dbo].[GameEventData] CHECK CONSTRAINT [FK_GameEventData_Consumer]
GO

ALTER TABLE [dbo].[GameEventData]  WITH CHECK ADD  CONSTRAINT [FK_GameEventData_Fuel] FOREIGN KEY([Fuel_ID])
REFERENCES [dbo].[Fuel] ([ID])
GO

ALTER TABLE [dbo].[GameEventData] CHECK CONSTRAINT [FK_GameEventData_Fuel]
GO



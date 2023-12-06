const calcSeasonBySeasonStats = (seasons) => {
  //   const filteredSeasons = player.seasons.filter(
  //     (season) => season.season === req.body.season
  //   );

  let seasonGoals = 0,
    leagueGoals = 0;

  if (seasons.length === 2) {
    if (seasons[0].seasonTotalGoalsA) {
      seasonGoals = seasons[0].seasonTotalGoalsA + seasons[1].seasonTotalGoalsB;
    } else {
      seasonGoals = seasons[0].seasonTotalGoalsB + seasons[1].seasonTotalGoalsA;
    }
    leagueGoals = seasons[0].lge_goals + seasons[1].lge_goals;
  } else {
    if (seasons[0].seasonTotalGoalsA) {
      seasonGoals = seasons[0].seasonTotalGoalsA;
    } else {
      seasonGoals = seasons[0].seasonTotalGoalsB;
    }
    leagueGoals = seasons[0].lge_goals;
  }

  return {
    seasonGoals,
    leagueGoals,
  };
};

module.exports = calcSeasonBySeasonStats;

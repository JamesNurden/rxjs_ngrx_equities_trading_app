const refreshInterval$ = interval(5000); // Poll every 5 seconds

refreshInterval$.pipe(
  mergeMap(() => getPortfolioPerformance())
).subscribe(
  performanceData => updatePerformanceDashboard(performanceData),
  error => console.error('Error fetching data:', error)
);

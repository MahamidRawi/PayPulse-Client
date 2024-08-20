export const hideTabBar = (navigation: any) => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
  };
  
  export const showTabBar = (navigation: any) => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'flex' } });
  };

  export const msToHMS = (milliseconds: number): string => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    const remainingSeconds = seconds % 60;
    const remainingMinutes = minutes % 60;

    return `${hours}h ${remainingMinutes}m ${remainingSeconds}s`;
}

export function formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so we add 1
    const year = date.getFullYear();

    // Return date as "D/M/Y"
    return `${day}/${month}/${year}`;
}

export function generatePieChartData(data: any) {
  // Create an object to store job totals by jobId
  const jobTotals: any = {};
  const jobTitles: any = {}; // To store job titles by jobId

  // Loop through the entries and sum totals by jobId
  data.entries.forEach((entry: any) => {
    if (!jobTotals[entry.jobId]) {
      jobTotals[entry.jobId] = 0;
    }
    jobTotals[entry.jobId] += entry.total;
  });

  // Create arrays for totals, colors, and titles
  const totalsArray = [];
  const colorsArray = [];
  const titlesArray = [];
  let unknownTotal = 0; // To collect totals for jobs that no longer exist

  // Loop through the jobs array to match jobId with color and push totals and titles
  data.jobs.forEach((job: any) => {
    if (jobTotals[job.jobId] !== undefined) {
      totalsArray.push(jobTotals[job.jobId]);
      colorsArray.push(job.color);
      titlesArray.push(job.title);
      delete jobTotals[job.jobId]; // Remove processed jobId
    }
  });

  // Handle entries with jobs that no longer exist
  Object.keys(jobTotals).forEach(jobId => {
    unknownTotal += jobTotals[jobId];
  });

  // If there are unknown totals, add them as a special "Unknown Job" category
  if (unknownTotal > 0) {
    totalsArray.push(unknownTotal);
    colorsArray.push("grey"); // Use a default color for unknown jobs
    titlesArray.push("Unknown Job"); // Label for unknown jobs
  }

  return { ts: totalsArray, ca: colorsArray, titlesArray };
}

export const totalTimeWorked = (entries: any) => {
  let totaltime = 0;
  entries.forEach((entry: any) => totaltime += entry.duration);
  return totaltime
}

export const totalMoneyEarned = (entries: any) => {
  let totalMoney = 0;
  entries.forEach((entry: any) => totalMoney += entry.total);
  return totalMoney
}
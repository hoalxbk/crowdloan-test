export const getPoolCountDown = (
  startJoinTime: Date | undefined,
  endJoinTime: Date | undefined,
  startBuyTime: Date | undefined,
  endBuyTime: Date | undefined,
  method: string | undefined
): { date: Date | undefined, display: string | undefined  } => {
  const today = new Date().getTime();
  let date;
  let display;

  if (method && method === "whitelist" && startJoinTime && endJoinTime && startBuyTime && endBuyTime) {
    if (today < startJoinTime.getTime()) {
      date = startJoinTime;
      display = "Start whitelist in";
    }

    if (today > startJoinTime.getTime() && today < endJoinTime.getTime()) {
      date = endJoinTime;
      display = "End whitelist in";
    }

    if (today > endJoinTime.getTime() && today < startBuyTime.getTime()) {
      date = startBuyTime;
      display = "Start buy in"
    }

    if (today > startBuyTime.getTime() && today < endBuyTime.getTime()) {
      date =  endBuyTime;
      display = "End buy in";
    }

  }

  if (method && method === "fcfs" && startBuyTime && endBuyTime) {
    if (today < startBuyTime.getTime()) {
      date = startBuyTime;
      display = "Start buy in"
    }

    if (today > startBuyTime.getTime() && today < endBuyTime.getTime()) {
      date = endBuyTime;
      display = "End buy in";
    }
  }

  return {
    date,
    display
  }
}

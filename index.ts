
async function fetchData(username:string):Promise<void> {
   try{ const res = await fetch(`https://api.github.com/users/${username}/events`);
    const data = await res.json();
         if (data.length === 0) {
           console.log("No recent activity found.");
           return;}
       const pushCounts: Record<string, number> = {};
    data.forEach((event:any)=>{
        switch(event.type){
            case "PushEvent":
                pushCounts[event.repo.name] = (pushCounts[event.repo.name] || 0) + 1
                break
            case "IssuesEvent":
                console.log(`- ${event.payload.action === "opened" ? "Opened" : "Updated"} an issue in ${event.repo.name}`);
                break;
            case "WatchEvent":
                console.log(`- Starred ${event.repo.name}`);
                break;
            case "ForkEvent":
                console.log(`- Forked ${event.repo.name}`);
                break;
            case "PullRequestEvent":
                console.log(`- ${event.payload.action} a pull request in ${event.repo.name}`);
                break;
            default:
                console.log(`- ${event.type} in ${event.repo.name}`);
        }})
       for (const [repo, count] of Object.entries(pushCounts)) {
           console.log(`Pushed ${count} times to ${repo}`);
       }
    }catch(err){
        console.log(err)
    }
}

const [,,command,...args] = process.argv


if (command ==='github-activity'){
    fetchData(args[0])
}
else{
    console.log('unknown command')
}

function log(request: string, client: string, et: number, status: number, msg: string, ...args) {
	const len_req : number = 6 - request.length;
	const date = new Date();
	process.stdout.write(`\n[ ${(status>400)?'\u001b[1;31m':''}${request}${"".padStart(len_req)} ${status}${(status>400)?'\u001b[0m':''} ${client}  ${date.getFullYear()}-${date.getMonth()}-${date.getDate()}T${date.toLocaleTimeString("en-CA", {hour12: false})} ] : ${msg}`.padEnd( (status>400)?124:113));
	process.stdout.write(`${(et*1e-6 > 100)?'\u001b[1;31m':(et*1e-6 > 10)?'\u001b[1;93m':''}${(et*1e-6).toFixed(3) } ms ${(et*1e-6 > 10)? '\u001b[0m':''}`)
}

export default log;

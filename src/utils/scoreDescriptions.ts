export const scoreDescriptions: { [key: string]: string } = {
    has_bp_json: "bp.json could be discovered",
    reports_query_node: "bp.json contained query node",
    reports_latest_version: "call to query node revealed latest version of API node",
    reports_producer_node: "bp.json contained producer node",
    reports_seed_node: "bp.json contained seed node",
    runs_api_node: "call to query node was successful",
    runs_history_node: "call to query V1 History node was successful",
    runs_hyperion_node: "call to query V2 History node was successful",
    results_a: "API query result count in 75th percentile",
    results_b: "API query result count in 50th percentile",
    results_c: "API query result count in 25th percentile",
    fee_votes: "Votes on fees",
    fee_voted_recently: "Votes on fees in last 30 days",
    bundle_votes: "Votes on bundles",
    signs_msigs: "Signs msigs",
    signs_msigs_quickly: "Signs msigs in 7 days or less",
    runs_tools: "Runs <a href='https://github.com/fioprotocol/fio.bpmonitor/blob/master/bptools.md'>tools for community</a>"
};
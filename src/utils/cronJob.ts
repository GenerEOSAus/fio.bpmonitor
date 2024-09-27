import cron from 'node-cron';
import { fetchProducers, fetchBpJson  } from '../services/producerService';
import { checkNode } from '../services/nodeService';
import { triggerFeeMultiplierFetch } from '../services/feeService';
import { triggerBundleFetch } from '../services/bundleService';
import { fetchProposals } from '../services/proposalService';
import { calculateProducerScores } from '../services/scoringService';
import { logger_log, logger_error } from './logger';
import { triggerToolsFetch } from "../services/toolsService";
import { triggerProducerChainMap } from "../services/chainMapService";

// Refresh Producers from chain
cron.schedule('1 1 * * *', async () => {
    try {
        await fetchProducers();
        logger_log('CRON','fetchAndUpdateProducers ran successfully.');
        await fetchBpJson();
        logger_log('CRON','fetchBPJson ran successfully.');
    } catch (error) {
        if (error instanceof Error) {
            logger_error('CRON',`fetchAndUpdateProducers and/or fetchBPJson job failed.`, error);
        } else {
            logger_log('CRON','fetchAndUpdateProducers and/or fetchBPJson job failed with an unknown .');
        }
    }
});

// Check Producer Nodes
cron.schedule('11 */4 * * *', async () => {
    try {
        await checkNode();
        logger_log('CRON','checkNode ran successfully.');
    } catch (error) {
        if (error instanceof Error) {
            logger_error('CRON',`checkNode job failed.`, error);
        } else {
            logger_log('CRON','checkNode job failed with an unknown error.');
        }
    }
});

// Check Producer Fee votes
cron.schedule('26 1 * * *', async () => {
    try {
        await triggerFeeMultiplierFetch();
        logger_log('CRON', 'fetchAndUpdateFees ran successfully.');
        await triggerBundleFetch();
        logger_log('CRON', 'fetchAndUpdateBundles ran successfully.');
    } catch (error) {
        if (error instanceof Error) {
            logger_error('CRON',`checkNode job failed.`, error);
        } else {
            logger_log('CRON','checkNode job failed with an unknown error.');
        }
    }
});

// Check Producer msig participation
cron.schedule('29 1 * * *', async () => {
    try {
        await fetchProposals();
        logger_log('CRON', 'fetchProposals ran successfully.');
    } catch (error) {
        if (error instanceof Error) {
            logger_error('CRON', `fetchProposals job failed.`, error);
        } else {
            logger_log('CRON', 'fetchProposals job failed with an unknown error.');
        }
    }
});

// Fetch BP Tools
cron.schedule('32 1 * * *', async () => {
    try {
        await triggerToolsFetch();
        logger_log('CRON', 'fetchAndUpdateProducerTools ran successfully.');
    } catch (error) {
        if (error instanceof Error) {
            logger_error('CRON', `fetchAndUpdateProducerTools job failed.`, error);
        } else {
            logger_log('CRON', 'fetchAndUpdateProducerTools job failed with an unknown error.');
        }
    }
});

// Fetch Chain Map
cron.schedule('35 1 * * *', async () => {
    try {
        await triggerProducerChainMap();
        logger_log('CRON', 'triggerProducerChainMap ran successfully.');
    } catch (error) {
        if (error instanceof Error) {
            logger_error('CRON', `triggerProducerChainMap job failed.`, error);
        } else {
            logger_log('CRON', 'triggerProducerChainMap job failed with an unknown error.');
        }
    }
});

// Calculate Producer Scores
cron.schedule('38 */4 * * *', async () => {
    try {
        await calculateProducerScores();
        logger_log('CRON', 'calculateProducerScores ran successfully.');
    } catch (error) {
        if (error instanceof Error) {
            logger_error('CRON', `calculateProducerScores job failed.`, error);
        } else {
            logger_log('CRON', 'calculateProducerScores job failed with an unknown error.');
        }
    }
});
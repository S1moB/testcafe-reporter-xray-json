let currentTest = {};

module.exports = function () {
    return {
        xrayReport: {
            info:  {},
            tests: []
        },
        testCount: 0,

        noColors: true,

        reportTaskStart (startTime, userAgents, testCount) {
            this.testCount = testCount;
            this.xrayReport.info.summary = 'Execution of automated tests through testCafe';
            this.xrayReport.info.description = 'This execution is automatically generated using our Framework';
            this.xrayReport.info.testEnvironments = userAgents;
            this.xrayReport.info.startDate = this.moment(startTime).format('YYYY-MM-DDThh:mm:ssZ');
        },

        reportFixtureStart ( /*name, path */) {
            // throw new Error('Not implemented');
        },

        async reportTestStart ( /*name, testMeta*/) {
            // NOTE: This method is optional.
        },

        async reportTestDone (name, testRunInfo) {
            let testStatus = 'UNDEFINED';
            const currentEvidences = {};

            const testStartDate = new Date();

            currentTest.testKey = ''; //still didn't find a way to get testKey so it stays empty for now
            if (!testRunInfo.skipped && JSON.stringify(testRunInfo.errs).replace(/[[\]]/g, '').length > 0) {
                testStatus = 'FAIL';
                currentTest.evidences = [];

                for (var i in testRunInfo.screenshots) {
                    currentEvidences.data = await this.base64Encode(testRunInfo.screenshots[i].screenshotPath);
                    currentEvidences.filename = testRunInfo.screenshots[i].screenshotPath;
                    currentEvidences.contentType = 'image/png';
                    currentTest.evidences.push(JSON.parse(JSON.stringify(currentEvidences)));
                }
                testRunInfo = 'Execution failed.';
            }
            else {
                testRunInfo = 'Test executed without any error';
                testStatus = 'PASS';
            }
            currentTest.comment = testRunInfo;
            currentTest.status = testStatus;
            currentTest.start =  this.moment(testStartDate).format('YYYY-MM-DDThh:mm:ssZ');
            currentTest.finish = this.moment(new Date(testStartDate.getTime() + testRunInfo.durationMs)).format('YYYY-MM-DDThh:mm:ssZ');
            delete currentTest.comment.errs;
            this.xrayReport.tests.push(JSON.parse(JSON.stringify(currentTest)));
            currentTest = {};
        },

        reportTaskDone (endTime /*, passed, warnings*/) {
            this.xrayReport.info.finishDate = this.moment(endTime).format('YYYY-MM-DDThh:mm:ssZ');
            this.write(JSON.stringify(this.xrayReport, null, 1));
        }
    };
};

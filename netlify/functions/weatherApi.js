// weatherApi.js 파일을 수정하겠습니다
exports.handler = async function(event, context) {
    try {
        let cache = context.clientContext?.cache || {};
        const now = Date.now();
        
        // 캐시가 있고 2시간 이내라면 캐시된 데이터 반환
        if (cache.weather && 
            cache.timestamp && 
            (now - cache.timestamp < 2 * 60 * 60 * 1000)) {
            return {
                statusCode: 200,
                body: JSON.stringify(cache.weather)
            };
        }

        // 여기에 실제 날씨 API 호출 코드가 들어갈 예정입니다
        // 지금은 테스트 데이터로 진행
        const testData = {
            message: "Weather data will be here",
            timestamp: new Date().toISOString()
        };

        // 캐시 업데이트
        cache = {
            weather: testData,
            timestamp: now
        };

        return {
            statusCode: 200,
            body: JSON.stringify(testData)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Something went wrong" })
        };
    }
};

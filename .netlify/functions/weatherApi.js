exports.handler = async function(event, context) {
    try {
        // 테스트용 응답
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Weather API function is working!",
                timestamp: new Date().toISOString()
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Something went wrong" })
        };
    }
};

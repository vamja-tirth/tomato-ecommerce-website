async function test() {
    try {
        const response = await fetch('https://tomato-ecommerce-website.onrender.com/api/test');
        const data = await response.text();
        console.log('GET /api/test:', data);
    } catch (error) {
        console.error('GET /api/test failed:', error.message);
    }

    try {
        const response = await fetch('https://tomato-ecommerce-website.onrender.com/api/contact/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: "Test",
                email: "test@test.com",
                message: "Hello"
            })
        });
        const data = await response.json();
        console.log('POST /api/contact/save:', data);
    } catch (error) {
        console.error('POST /api/contact/save failed:', error.message);
    }
}

test();

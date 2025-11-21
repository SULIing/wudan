// functions/api/submit.js

export async function onRequestPost(context) {
  try {
    const { request } = context;
    const data = await request.json();
    if (!data.name || !data.email || !data.message) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }
    return new Response(JSON.stringify({ 
      success: true, 
      message: "Data packet received" 
    }), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: "System Failure" }), { status: 500 });
  }
}
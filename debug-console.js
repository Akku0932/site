// PASTE THIS IN BROWSER CONSOLE TO DEBUG
// Open your site: https://site-9xmql8bkv-noris-projects-9043653e.vercel.app
// Press F12 → Console tab → Paste this entire code → Press Enter

console.log('=== KORDEXFLOW DEBUG ===');

// 1. Check if Supabase client exists
console.log('1. Supabase client exists?', typeof supabase !== 'undefined');

// 2. Check logos loaded
console.log('2. Light logo loaded?', CUSTOM_LOGO_LIGHT !== null);
console.log('3. Dark logo loaded?', CUSTOM_LOGO_DARK !== null);

// 3. Check logo elements in DOM
console.log('4. Light logo in DOM?', document.querySelector('#headerLogoLight') !== null);
console.log('5. Dark logo in DOM?', document.querySelector('#headerLogoDark') !== null);

// 4. Test Supabase connection
if (typeof supabase !== 'undefined') {
  supabase.from('demo_requests').select('*').limit(1).then(result => {
    console.log('6. Supabase query result:', result);
    if (result.error) {
      console.error('❌ SUPABASE ERROR:', result.error.message);
    } else {
      console.log('✅ Supabase working! Records:', result.data.length);
    }
  });
} else {
  console.error('❌ Supabase client not loaded!');
}

// 5. Test logo file loading
fetch('logo-light.svg').then(r => {
  console.log('7. logo-light.svg status:', r.status, r.ok ? '✅' : '❌');
});
fetch('logo-dark.svg').then(r => {
  console.log('8. logo-dark.svg status:', r.status, r.ok ? '✅' : '❌');
});

console.log('=== Copy all output above and send to me ===');

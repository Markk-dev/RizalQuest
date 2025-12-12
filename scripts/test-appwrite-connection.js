const { Client, Databases } = require('node-appwrite');
require('dotenv').config({ path: '.env.local' });

async function testAppwriteConnection() {
  console.log('🔍 Testing Appwrite Connection...\n');

  // Check environment variables
  console.log('📋 Environment Variables:');
  console.log('ENDPOINT:', process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || '❌ MISSING');
  console.log('PROJECT_ID:', process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '❌ MISSING');
  console.log('API_KEY:', process.env.NEXT_PUBLIC_APPWRITE_API ? '✅ SET' : '❌ MISSING');
  console.log('');

  if (!process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || !process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID) {
    console.error('❌ Missing required environment variables!');
    process.exit(1);
  }

  // Initialize client
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

  if (process.env.NEXT_PUBLIC_APPWRITE_API) {
    client.setKey(process.env.NEXT_PUBLIC_APPWRITE_API);
  }

  const databases = new Databases(client);
  const DATABASE_ID = 'rizal-quest-db';

  try {
    // Test 1: Check if database exists
    console.log('🔄 Test 1: Checking database...');
    const database = await databases.get(DATABASE_ID);
    console.log('✅ Database found:', database.name);
    console.log('');

    // Test 2: List collections
    console.log('🔄 Test 2: Listing collections...');
    const collections = await databases.listCollections(DATABASE_ID);
    console.log(`✅ Found ${collections.total} collections:`);
    collections.collections.forEach(col => {
      console.log(`   - ${col.name} (${col.$id})`);
    });
    console.log('');

    // Test 3: Check specific collections
    console.log('🔄 Test 3: Checking required collections...');
    const requiredCollections = ['users', 'user_progress', 'quests', 'user_quests', 'shop_items', 'questions'];
    const existingCollections = collections.collections.map(c => c.$id);
    
    requiredCollections.forEach(collectionId => {
      if (existingCollections.includes(collectionId)) {
        console.log(`   ✅ ${collectionId}`);
      } else {
        console.log(`   ❌ ${collectionId} - MISSING!`);
      }
    });
    console.log('');

    // Test 4: Try to read from users collection
    console.log('🔄 Test 4: Testing read access to users collection...');
    try {
      const users = await databases.listDocuments(DATABASE_ID, 'users', []);
      console.log(`✅ Successfully read users collection (${users.total} users)`);
    } catch (error) {
      console.log('❌ Failed to read users collection:', error.message);
    }
    console.log('');

    console.log('✅ All tests completed!');
    console.log('');
    console.log('📊 Summary:');
    console.log('   - Appwrite server: ✅ Reachable');
    console.log('   - Database: ✅ Accessible');
    console.log('   - Collections: Check results above');

  } catch (error) {
    console.error('❌ Connection test failed!');
    console.error('');
    console.error('Error details:');
    console.error('Type:', error.type || 'Unknown');
    console.error('Message:', error.message);
    console.error('Code:', error.code || 'N/A');
    console.error('');
    
    if (error.code === 404) {
      console.log('💡 Suggestion: Database "rizal-quest-db" does not exist. Create it in Appwrite Console.');
    } else if (error.code === 401) {
      console.log('💡 Suggestion: Invalid API key or project ID. Check your .env.local file.');
    } else if (error.message.includes('fetch')) {
      console.log('💡 Suggestion: Cannot reach Appwrite server. Check your endpoint URL and internet connection.');
    } else if (error.code === 500) {
      console.log('💡 Suggestion: Appwrite server error. The server might be down or having issues.');
    }
    
    process.exit(1);
  }
}

testAppwriteConnection();

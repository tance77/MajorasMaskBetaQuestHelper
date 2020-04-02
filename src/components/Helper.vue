<template>
    <div class="p-4">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
            Majora's Mask Beta Quest (Helper)
        </h2>

        <div class="bg-white shadow rounded-lg mt-4">
            <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 class="text-lg leading-6 font-medium text-gray-90">
                    Add Location
                </h3>
            </div>
            <div class="flex mt-4 p-4">
                <div class="flex-1 mr-2 relative">
                    <SearchLocations label="Enter" :options="fromLocations" :selected-search="selectedNewFrom"
                        @selected="handleSearchFromUpdate"
                    />
                </div>

                <div class="flex-1 ml-2 relative">
                    <SearchLocations label="Exit" :options="toLocations" :selected-search="selectedNewTo"
                        @selected="handleSearchToUpdate"
                    />
                </div>
            </div>
            <div class="text-right mt-4 p-4">
                <span class="ml-3 inline-flex rounded-md shadow-sm">
                    <button type="submit"
                        class="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out disabled:opacity-25 disabled:cursor-not-allowed"
                        :disabled="selectedNewTo === null || selectedNewFrom === null" @click="addLocation"
                    >
                        Add
                    </button>
                </span>
            </div>
        </div>

        <!--        <div class="bg-white shadow rounded-lg mt-4">-->
        <!--            <div class="px-4 py-5 border-b border-gray-200 sm:px-6">-->
        <!--                <h3 class="text-lg leading-6 font-medium text-gray-90">-->
        <!--                    Shortest Path-->
        <!--                </h3>-->
        <!--            </div>-->
        <!--            <div class="flex mt-4 p-4">-->
        <!--                <div class="flex-1 mr-2 relative">-->
        <!--                    <SearchLocations label="From" :options="fromLocations" :selected-search="selectedShortestPathFrom"-->
        <!--                        @selected="handleShortestPathFromUpdate"-->
        <!--                    />-->
        <!--                </div>-->

        <!--                <div class="flex-1 ml-2 relative">-->
        <!--                    <SearchLocations label="To" :options="fromLocations" :selected-search="selectedShortestPathTo"-->
        <!--                        @selected="handleShortestPathToUpdate"-->
        <!--                    />-->
        <!--                </div>-->
        <!--            </div>-->
        <!--            <div class="text-right mt-4 p-4">-->
        <!--                <span class="ml-3 inline-flex rounded-md shadow-sm">-->
        <!--                    <button type="submit"-->
        <!--                        class="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out disabled:opacity-25 disabled:cursor-not-allowed"-->
        <!--                        :disabled="selectedShortestPathFrom === null || selectedShortestPathTo === null" @click="shortestPath"-->
        <!--                    >-->
        <!--                        Find Shortest Path-->
        <!--                    </button>-->
        <!--                </span>-->
        <!--            </div>-->
        <!--        </div>-->

        <div class="rounded-lg mt-4">
            <div class="px-4 py-5 border-b border-gray-200 sm:px-6 bg-white rounded-t-lg">
                <h3 class="text-lg leading-6 font-medium text-gray-90">
                    Known Locations
                </h3>
            </div>
            <div class="flex flex-col">
                <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg-b border-b border-gray-200">
                        <table class="min-w-full">
                            <thead>
                                <tr class="bg-gray-100">
                                    <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Location
                                    </th>
                                    <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Enter
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white">
                                <tr v-for="(nodes, nodeIndex) in graph.adjacencyList" v-if="graph.adjacencyList[nodeIndex].length" :key="nodeIndex">
                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 font-medium text-gray-900">
                                        {{ nodeIndex }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 font-medium text-gray-900">
                                        <table class="w-full">
                                            <tr v-for="(node, edgeIndex) in nodes" :key="nodeIndex+'edge'+edgeIndex">
                                                <td class="w-4/5">
                                                    {{ node.node }}
                                                </td>
                                                <td class="flex-1">
                                                    <button class="text-red-500" @click="removeIndexFromAdjacencyList(edgeIndex, nodeIndex)">
                                                        <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
                                                            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                                clip-rule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <Notification :show="showNotification" :message="message" @close="handleNotificationClose"/>
    </div>
</template>

<script>
    import SearchLocations from './SearchLocations';
    import Notification from './Notification';

    export default {
        name: 'Helper',
        components: {Notification, SearchLocations},
        data() {
            return {
                selectedNewFrom: null,
                selectedNewTo: null,
                selectedShortestPathFrom: null,
                selectedShortestPathTo: null,
                fromLocations: [
                    'Mayor\'s Residence (from East Clock Town)',
                    'Majora\'s Room',
                    'Magic Hag\'s Potion Shop (from Southern Swamp)',
                    'Ranch Barn (from Romani Ranch)',
                    'Ranch House (from Romani Ranch)',
                    'Honey & Darling',
                    'Beneath the Graveyard (Heart Piece)',
                    'Beneath the Graveyard (Song of Storms)',
                    'Curiosity Shop (from West Clock Town)',
                    'Back Room (from Laundry Pool)',
                    'Curiosity Shop (from Back Room)',
                    'Back Room (from Curiosity Shop)',
                    'Great Bay Gossip Stones Grotto',
                    'Swamp Gossip Stones Grotto',
                    'Ikana Gossip Stones Grotto',
                    'Snowhead Gossip Stones Grotto',
                    'Generic Grotto',
                    'Hotspring Water Grotto',
                    'Deku Palace Garden Back Grotto',
                    'Dodongo Grotto',
                    'Deku Palace Garden Front Grotto',
                    'Bisness Deku Scrub Grotto',
                    'Cow Grotto',
                    'Bio Baba Grotto',
                    'Magic Bean Seller Grotto',
                    'Peahat Grotto',
                    'Deku Palace Garden Back Grotto',
                    'Deku Palace Garden Front Grotto',
                    'Lone Peak Shrine',
                    'Ikana Canyon (from Path to Ikana)',
                    'Ikana Canyon (from Ghost Hut)',
                    'Ikana Canyon (from Musicbox House)',
                    'Ikana Canyon (from Stone Tower)',
                    'Ikana Canyon (from Song of Soaring)',
                    'Ikana Canyon (from Beneath the Well)',
                    'Ikana Canyon (from Sakon\'s Hideout)',
                    'Ikana Canyon (from Clear Cutscene)',
                    'Ikana Canyon (from Ancient Castle of Ikana)',
                    'Spring Water Cave (from Farewell to Gibdos)',
                    'Ikana Canyon (from Fairy Fountain)',
                    'Ikana Canyon (from Secret Shrine)',
                    'Ikana Canyon (from Spring Water Cave)',
                    'Spring Water Cave (from Ikana Canyon)',
                    'Pirates\' Fortress Interior (from Exterior)',
                    'Pirates\' Fortress Interior (from Hookshot Lower)',
                    'Pirates\' Fortress Interior (from Hookshot Upper)',
                    'Pirates\' Fortress Interior (from Purple Pirate entrance)',
                    'Pirates\' Fortress Interior (from Purple Pirate exit)',
                    'Pirates\' Fortress Interior (from Green Pirate entrance)',
                    'Pirates\' Fortress Interior (from Green Pirate exit)',
                    'Pirates\' Fortress Interior (from Red Pirate entrance)',
                    'Pirates\' Fortress Interior (from Red Pirate exit)',
                    'Pirates\' Fortress Interior (from Telescope)',
                    'Pirates\' Fortress Interior (from Exiterior balcony)',
                    'Milk Bar',
                    'Stone Tower Temple',
                    'Treasure Chest Shop',
                    'Inverted Stone Tower Temple',
                    'Inverted Stone Tower Temple (Boss Door)',
                    'Woodfall Temple (from Woodfall)',
                    'Deku Princess\' Room (from Clear Cutscene)',
                    'Deku Princess\' Room (from Woodfall)',
                    'Path to Mountain Village (from Termina Field)',
                    'Path to Mountain Village (from Mountain Village)',
                    'Ancient Castle of Ikana (from Beneath the Well)',
                    'Ancient Castle of Ikana (from Ikana Canyon)',
                    'Ancient Castle of Ikana (from Castle Interior)',
                    'Ancient Castle of Ikana (from Castle Exterior)',
                    'Ancient Castle of Ikana (from Keg Hole)',
                    'Ancient Castle of Ikana (from Hole under Block)',
                    'Ancient Castle of Ikana (from Igo\'s Room)',
                    'Deku Playground',
                    'Odolwa\'s Room',
                    'Shooting Gallery (Clock Town)',
                    'Snowhead Temple',
                    'Milk Road (from Termina Field)',
                    'Milk Road (from Romani Ranch)',
                    'Milk Road (from Gorman Track back)',
                    'Milk Road (from Gorman Track)',
                    'Milk Road (from Song of Soaring)',
                    'Pirates\' Fortress Rooms (Hookshot Lower)',
                    'Pirates\' Fortress Rooms (Hookshot Upper)',
                    'Pirates\' Fortress Rooms (Purple Pirate entrance)',
                    'Pirates\' Fortress Rooms (Purple Pirate exit)',
                    'Pirates\' Fortress Rooms (Green Pirate entrance)',
                    'Pirates\' Fortress Rooms (Green Pirate exit)',
                    'Pirates\' Fortress Rooms (Red Pirate entrance)',
                    'Pirates\' Fortress Rooms (Red Pirate exit)',
                    'Pirates\' Fortress Rooms (from Telescope)',
                    'Pirates\' Fortress Rooms (Sewers entrance)',
                    'Pirates\' Fortress Rooms (Sewers exit)',
                    'Shooting Gallery (Swamp)',
                    'Pinnacle Rock',
                    'Fairy\'s Fountain (Clock Town)',
                    'Fairy\'s Fountain (Woodfall)',
                    'Fairy\'s Fountain (Snowhead)',
                    'Fairy\'s Fountain (Great Bay)',
                    'Fairy\'s Fountain (Ikana)',
                    'Swamp Spider House',
                    'Ocean Spider House',
                    'Bombers\' Hideout',
                    'Observatory (from Termina Field)',
                    'Observatory (from Telescope)',
                    'Woodfall Trial (from Moon)',
                    'Deku Palace (from Southern Swamp)',
                    'Deku Palace (from being thrown out)',
                    'Deku Palace (from Deku King\'s Chamber)',
                    'Deku Palace (from Monkey cage)',
                    'Deku Palace (from Deku Shrine)',
                    'Deku Palace (from Swamp Shortcut)',
                    'Deku Palace (from Deku Palace Garden Front Grotto)',
                    'Deku Palace (from Deku Palace Garden Back Grotto)',
                    'Deku Palace (from Deku Palace Garden Back Grotto)',
                    'Deku Palace (from Magic Bean Seller Grotto)',
                    'Deku Palace (from Deku Palace Garden Front Grotto)',
                    'Mountain Smithy',
                    'Termina Field (from West Clock Town)',
                    'Termina Field (from Path to Southern Swamp)',
                    'Termina Field (from Great Bay Coast)',
                    'Termina Field (from Path to Mountain Village)',
                    'Termina Field (from Path to Ikana Canyon)',
                    'Termina Field (from Milk Road)',
                    'Termina Field (from South Clock Town)',
                    'Termina Field (from East Clock Town)',
                    'Termina Field (from North Clock Town)',
                    'Termina Field (from Observatory)',
                    'Termina Field (Telescope)',
                    'Termina Field (from Milk Road with Cremia)',
                    'Post Office',
                    'Marine Research Lab',
                    'Beneath the Graveyard (Bottle)',
                    'Dampe\'s Room',
                    'Goron Shrine (from Goron Village)',
                    'Goron Shrine (from Goron Shop)',
                    'Zora Hall (from Zora Cape)',
                    'Zora Hall (from Zora Cape back)',
                    'Zora Hall (from Zora Shop)',
                    'Zora Hall (from Lulu\'s Room)',
                    'Zora Hall (from Evan\'s Room)',
                    'Zora Hall (from Japas\' Room)',
                    'Zora Hall (from Mikau\'s Room)',
                    'Zora Hall (from Band Rehearsal)',
                    'Trading Post',
                    'Romani Ranch (from Milk Road)',
                    'Romani Ranch (from Barn)',
                    'Romani Ranch (from House)',
                    'Romani Ranch (from Cucco Shack)',
                    'Romani Ranch (from Doggy Racetrack)',
                    'Romani Ranch (from Receiving Milk Bottle)',
                    'Romani Ranch (from Romani being abducted)',
                    'Twinmold\'s Room',
                    'Great Bay Coast (from Termina Field)',
                    'Great Bay Coast (from Zora Cape)',
                    'Great Bay Coast (from Murky Water Left)',
                    'Great Bay Coast (from Pinnacle Rock)',
                    'Great Bay Coast (from Fisherman\'s Hut)',
                    'Great Bay Coast (from Pirates\' Fortress)',
                    'Great Bay Coast (from Murky Water Right)',
                    'Great Bay Coast (from Marine Research Lab)',
                    'Great Bay Coast (from Oceanside Spider House)',
                    'Great Bay Coast (from Zora Mask Cutscene)',
                    'Great Bay Coast (from Song of Soaring)',
                    'Great Bay Coast (from Pirates\' Fortress caught)',
                    'Zora Cape (from Great Bay Coast)',
                    'Zora Cape (from Zora Hall)',
                    'Zora Cape (from Zora Hall back)',
                    'Zora Cape (from Murky Water)',
                    'Zora Cape (from Waterfall Rapids)',
                    'Zora Cape (from Fairy\'s Fountain)',
                    'Zora Cape (from Song of Soaring)',
                    'Zora Cape (from Great Bay Temple)',
                    'Lottery Shop',
                    'Pirates\' Fortress Exterior (from Great Bay Coast)',
                    'Pirates\' Fortress Exterior (from Interior)',
                    'Pirates\' Fortress Exterior (from Sewers)',
                    'Pirates\' Fortress Exterior (from Sewers Draft)',
                    'Pirates\' Fortress Exterior (from Interior caught)',
                    'Pirates\' Fortress Exterior (from Interior balcony)',
                    'Pirates\' Fortress Exterior (from Sewers end)',
                    'Fisherman\'s Hut',
                    'Goron Shop',
                    'Deku King\'s Chamber (from Deku Palace)',
                    'Deku King\'s Chamber (from Deku Palace upper)',
                    'Deku King\'s Chamber (from Deku Princess)',
                    'Deku King\'s Chamber (from Releasing Monkey)',
                    'Snowhead Trial (from Moon)',
                    'Path to the Swamp (from Termina Field)',
                    'Path to the Swamp (from Southern Swamp)',
                    'Path to the Swamp (from Shooting Gallery)',
                    'Doggy Racetrack',
                    'Cucco Shack',
                    'Ikana Graveyard (from Path to Ikana)',
                    'Ikana Graveyard (from Beneath the Graveyard (Bottle))',
                    'Ikana Graveyard (from Beneath the Graveyard (Heart Piece))',
                    'Ikana Graveyard (from Beneath the Graveyard (Song of Storms))',
                    'Ikana Graveyard (from Dampe\'s Room)',
                    'Ikana Graveyard (from Defeating Captain Keeta)',
                    'Goht\'s Room',
                    'Southern Swamp (from Path to Swamp)',
                    'Southern Swamp (from Tourist Information)',
                    'Southern Swamp (from Woodfall)',
                    'Southern Swamp (from Deku Palace)',
                    'Southern Swamp (from Deku Palace Upper)',
                    'Southern Swamp (from Magic Hag\'s Potion Shop)',
                    'Southern Swamp (from Woods of Mystery)',
                    'Southern Swamp (from Swamp Spider House)',
                    'Southern Swamp (from Ikana Canyon)',
                    'Southern Swamp (from Song of Soaring)',
                    'Woodfall (from Southern Swamp)',
                    'Woodfall (from Woodfall Temple)',
                    'Woodfall (from Fairy\'s Fountain)',
                    'Woodfall (from Woodfall Temple back)',
                    'Woodfall (from Song of Soaring)',
                    'Great Bay Trial (from Moon)',
                    'Great Bay Trial (from Murky Water)',
                    'Great Bay Temple (from Zora Cape)',
                    'Great Bay Temple (from Pirate Cutscene)',
                    'Waterfall Rapids (from Zora Cape)',
                    'Beneath the Well (from Ikana Canyon)',
                    'Beneath the Well (from Ancient Castle of Ikana)',
                    'Mikau\'s Room (from Zora Hall)',
                    'Japas\' Room (from Zora Hall)',
                    'Lulu\'s Room (from Zora Hall)',
                    'Evan\'s Room (from Zora Hall)',
                    'Zora Shop',
                    'Goron Village (from Path to Goron Village)',
                    'Goron Village (from Goron Shrine)',
                    'Goron Village (from Lone Peak Shrine)',
                    'Goron Graveyard (from Mountain Village)',
                    'Sakon\'s Hideout',
                    'Mountain Village (from Mountain Smithy)',
                    'Mountain Village (from Path to Goron Village)',
                    'Mountain Village (from Goron Graveyard)',
                    'Mountain Village (from Path to Snowhead)',
                    'Mountain Village (from Path to Mountain Village)',
                    'Mountain Village (from Clear Cutscene)',
                    'Mountain Village (from Song of Soaring)',
                    'Ghost Hut (from Ikana Canyon)',
                    'Deku Shrine',
                    'Path to Ikana (from Termina Field)',
                    'Path to Ikana (from Ikana Graveyard)',
                    'Path to Ikana (from Ikana Canyon)',
                    'Swordsman\'s School',
                    'Music Box House',
                    'Igos du Ikana\'s Room',
                    'Tourist Information',
                    'Stone Tower (from Ikana Canyon)',
                    'Stone Tower (from Un-inverting)',
                    'Stone Tower (from Stone Tower Temple)',
                    'Stone Tower (from Song of Soaring)',
                    'Inverted Stone Tower (from Inverting)',
                    'Inverted Stone Tower (from Inverted Stone Tower Temple)',
                    'Path to Snowhead (from Mountain Village)',
                    'Path to Snowhead (from Snowhead)',
                    'Snowhead (from Path to Snowhead/Void)',
                    'Snowhead (from Snowhead Temple)',
                    'Snowhead (from Fairy\'s Fountain)',
                    'Snowhead (from Song of Soaring)',
                    'Path to Goron Village (from Mountain Village)',
                    'Path to Goron Village (from Goron Village)',
                    'Path to Goron Village (from Goron Racetrack)',
                    'Gyorg\'s Room',
                    'Secret Shrine',
                    'Stock Pot Inn (from East Clock Town)',
                    'Stock Pot Inn (from East Clock Town upper)',
                    'Stock Pot Inn (from Midnight Meeting)',
                    'Clock Tower (from Pre Clock Tower)',
                    'Clock Tower (from South Clock Town)',
                    'Woods of Mystery',
                    'Stone Tower Trial (from Moon)',
                    'On the Moon',
                    'Gorman Racetrack (from Milk Road)',
                    'Gorman Racetrack (from Milk Road west)',
                    'Goron Racetrack (from Path to Goron Village)',
                    'East Clock Town (from Termina Field)',
                    'East Clock Town (from South Clock Towe south)',
                    'East Clock Town (from Bomber\'s Hideout)',
                    'East Clock Town (from South Clock Town north)',
                    'East Clock Town (from Treasure Chest Shop)',
                    'East Clock Town (from North Clock Town)',
                    'East Clock Town (from Honey & Darling)',
                    'East Clock Town (from Mayor\'s Residence)',
                    'East Clock Town (from Shooting Gallery)',
                    'East Clock Town (from Stock Pot Inn)',
                    'East Clock Town (from Stokc Pot Inn upper)',
                    'East Clock Town (from Milk Bar)',
                    'West Clock Town (from Termina Field)',
                    'West Clock Town (from South Clock Town south)',
                    'West Clock Town (from South Clock Town north)',
                    'West Clock Town (from Swordsman\'s School)',
                    'West Clock Town (from Curiosity Shop)',
                    'West Clock Town (from Trading Post)',
                    'West Clock Town (from Post Office)',
                    'West Clock Town (from Lottery Shop)',
                    'North Clock Town (from Termina Field)',
                    'North Clock Town (from East Clock Town)',
                    'North Clock Town (from South Clock Town)',
                    'North Clock Town (from Fairy\'s Fountain)',
                    'North Clock Town (from Deku Playground)',
                    'North Clock Town (from Catching all Bombers)',
                    'North Clock Town (from Bombers Hide and Seek)',
                    'South Clock Town (from Clock Tower)',
                    'South Clock Town (from Termina Field)',
                    'South Clock Town (from East Clock Town north)',
                    'South Clock Town (from West Clock Town north)',
                    'South Clock Town (from North Clock Town)',
                    'South Clock Town (from West Clock Town south)',
                    'South Clock Town (from Laundry Pool)',
                    'South Clock Town (from East Clock Town south)',
                    'South Clock Town (from Song of Soaring)',
                    'Laundry Pool (from South Clock Town)',
                    'Laundry Pool (from Back Room)',
                ],
                toLocations: [
                    'Ancient Castle of Ikana',
                    'Back Room',
                    'Beneath the Graveyard (Bottle)',
                    'Beneath the Graveyard (Heart Piece)',
                    'Beneath the Graveyard (Song of Storms)',
                    'Beneath the Well',
                    'Bio Baba Grotto',
                    'Bisness Deku Scrub Grotto',
                    'Bombers\' Hideout',
                    'Clock Tower',
                    'Cow Grotto',
                    'Cucco Shack',
                    'Curiosity Shop',
                    'Dampe\'s Room',
                    'Deku King\'s Chamber',
                    'Deku Palace Garden Back Grotto',
                    'Deku Palace Garden Front Grotto',
                    'Deku Palace',
                    'Deku Playground',
                    'Deku Princess\' Room',
                    'Deku Shrine',
                    'Dodongo Grotto',
                    'Doggy Racetrack',
                    'East Clock Town',
                    'Evan\'s Room',
                    'Fairy\'s Fountain (Clock Town)',
                    'Fairy\'s Fountain (Great Bay)',
                    'Fairy\'s Fountain (Ikana)',
                    'Fairy\'s Fountain (Snowhead)',
                    'Fairy\'s Fountain (Woodfall)',
                    'Fisherman\'s Hut',
                    'Generic Grotto',
                    'Ghost Hut',
                    'Goht\'s Room',
                    'Gorman Racetrack',
                    'Goron Graveyard',
                    'Goron Racetrack',
                    'Goron Shop',
                    'Goron Shrine',
                    'Goron Village',
                    'Great Bay Coast',
                    'Great Bay Gossip Stones Grotto',
                    'Great Bay Temple',
                    'Great Bay Trial',
                    'Gyorg\'s Room',
                    'Honey & Darling',
                    'Hotspring Water Grotto',
                    'Igos du Ikana\'s Room',
                    'Ikana Canyon',
                    'Ikana Gossip Stones Grotto',
                    'Ikana Graveyard',
                    'Inverted Stone Tower Temple (Boss Door)',
                    'Inverted Stone Tower Temple',
                    'Inverted Stone Tower',
                    'Japas\' Room',
                    'Laundry Pool',
                    'Lone Peak Shrine',
                    'Lottery Shop',
                    'Lulu\'s Room',
                    'Magic Bean Seller Grotto',
                    'Magic Hag\'s Potion Shop',
                    'Majora\'s Room',
                    'Marine Research Lab',
                    'Mayor\'s Residence',
                    'Mikau\'s Room',
                    'Milk Bar',
                    'Milk Road',
                    'Mountain Smithy',
                    'Mountain Village',
                    'Music Box House',
                    'North Clock Town',
                    'Observatory',
                    'Ocean Spider House',
                    'Odolwa\'s Room',
                    'On the Moon',
                    'Path to Goron Village',
                    'Path to Ikana',
                    'Path to Mountain Village',
                    'Path to Snowhead',
                    'Path to the Swamp',
                    'Peahat Grotto',
                    'Pinnacle Rock',
                    'Pirates\' Fortress Exterior',
                    'Pirates\' Fortress Interior',
                    'Pirates\' Fortress Rooms (Green Pirate entrance)',
                    'Pirates\' Fortress Rooms (Green Pirate exit)',
                    'Pirates\' Fortress Rooms (Hookshot Lower)',
                    'Pirates\' Fortress Rooms (Hookshot Upper)',
                    'Pirates\' Fortress Rooms (Purple Pirate entrance)',
                    'Pirates\' Fortress Rooms (Purple Pirate exit)',
                    'Pirates\' Fortress Rooms (Red Pirate entrance)',
                    'Pirates\' Fortress Rooms (Red Pirate exit)',
                    'Pirates\' Fortress Rooms (Sewers entrance)',
                    'Pirates\' Fortress Rooms (Sewers exit)',
                    'Pirates\' Fortress Rooms',
                    'Post Office',
                    'Ranch Barn',
                    'Ranch House',
                    'Romani Ranch',
                    'Sakon\'s Hideout',
                    'Secret Shrine',
                    'Shooting Gallery (Clock Town)',
                    'Shooting Gallery (Swamp)',
                    'Snowhead Gossip Stones Grotto',
                    'Snowhead Temple',
                    'Snowhead Trial',
                    'Snowhead',
                    'South Clock Town',
                    'Southern Swamp',
                    'Spring Water Cave',
                    'Stock Pot Inn',
                    'Stone Tower Temple',
                    'Stone Tower Trial',
                    'Stone Tower',
                    'Swamp Gossip Stones Grotto',
                    'Swamp Spider House',
                    'Swordsman\'s School',
                    'Termina Field (Telescope)',
                    'Termina Field',
                    'Tourist Information',
                    'Trading Post',
                    'Treasure Chest Shop',
                    'Twinmold\'s Room',
                    'Waterfall Rapids',
                    'West Clock Town',
                    'Woodfall Temple',
                    'Woodfall Trial',
                    'Woodfall',
                    'Woods of Mystery',
                    'Zora Cape',
                    'Zora Hall',
                    'Zora Shop',
                ],
                testEdges: [
                    ['Mayor\'s Residence (from East Clock Town)', 'Mountain Village (from Path to Goron Village)'],
                    ['Majora\'s Room ', 'Deku Palace (from Magic Bean Seller Grotto)'],
                    ['Magic Hag\'s Potion Shop (from Southern Swamp) ', 'Southern Swamp (from Swamp Spider House)'],
                    ['Ranch Barn (from Romani Ranch)', 'North Clock Town (from East Clock Town)'],
                    ['Ranch House (from Romani Ranch) ', 'Ancient Castle of Ikana (from Igo\'s Room)'],
                    ['Honey & Darling', 'Goron Shrine (from Goron Shop)'],
                    ['Beneath the Graveyard (Heart Piece) ', 'Observatory (from Termina Field)'],
                    ['Beneath the Graveyard (Song of Storms)', 'Woodfall (from Fairy\'s Fountain)'],
                    ['Curiosity Shop (from West Clock Town)', 'Generic Grotto'],
                    ['Back Room (from Laundry Pool)', 'Sakon\'s Hideout'],
                    ['Curiosity Shop (from Back Room) ', 'Deku Princess\'s Room (from Woodfall)'],
                    ['Back Room (from Curiosity Shop) ', 'West Clock Town (from Post Office)'],
                    ['Great Bay Gossip Stones Grotto', 'Woodfall (from Woodfall Temple)'],
                    ['Swamp Gossip Stones Grotto', 'Inverted Stone Tower (from Inverting)'],
                    ['Ikana Gossip Stones Grotto', 'Woodfall Temple (from Woodfall)'],
                    ['Snowhead Gossip Stones Grotto', 'Ikana Graveyard (from Defeating Captain Keeta)'],
                    ['Generic Grotto', 'Swamp Gossip Stones Grotto'],
                    ['Hotspring Water Grotto', 'Romani Ranch (from Cucco Shack)'],
                    ['Deku Palace Garden Back Grotto', 'Path to Mountain Village (from Termina Field)'],
                    ['Dodongo Grotto', 'Ikana Canyon (from Song of Soaring)'],
                    ['Deku Palace Garden Front Grotto ', 'Ranch Barn (from Romani Ranch)'],
                    ['Bisness Deku Scrub Grotto', 'Magic Bean Seller Grotto'],
                    ['Cow Grotto', 'Peahat Grotto'],
                    ['Bio Baba Grotto', 'Termina Field (from South Clock Town)'],
                    ['Magic Bean Seller Grotto', 'Pinnacle Rock'],
                    ['Peahat Grotto ', 'Igos du Ikana\'s Room'],
                    ['Deku Palace Garden Back Grotto', 'Pirates\'s Fortress Rooms (Sewers exit)'],
                    ['Deku Palace Garden Front Grotto ', 'Observatory (from Telescope)'],
                    ['Lone Peak Shrine', 'Deku Palace Garden Front Grotto'],
                    ['Ikana Canyon (from Path to Ikana)', 'Ikana Canyon (from Stone Tower)'],
                    ['Ikana Canyon (from Ghost Hut)', 'Pirates\'s Fortress Rooms (Purple Pirate exit)'],
                    ['Ikana Canyon (from Musicbox House)', 'Zora Hall (from Japas\'s Room)'],
                    ['Ikana Canyon (from Stone Tower) ', 'Ancient Castle of Ikana (from Ikana Canyon)'],
                    ['Ikana Canyon (from Song of Soaring) ', 'Cow Grotto'],
                    ['Ikana Canyon (from Beneath the Well)', 'Spring Water Cave (from Farewell to Gibdos)'],
                    ['Ikana Canyon (from Sakon\'s Hideout) ', 'Pirates\'s Fortress Rooms (Red Pirate entrance)'],
                    ['Ikana Canyon (from Clear Cutscene)', 'Path to Snowhead (from Snowhead)'],
                    ['Ikana Canyon (from Ancient Castle of Ikana)', 'Laundry Pool (from South Clock Town)'],
                    ['Spring Water Cave (from Farewell to Gibdos)', 'Termina Field (from Path to Southern Swamp)'],
                    ['Ikana Canyon (from Fairy Fountain)', 'Waterfall Rapids (from Zora Cape)'],
                    ['Ikana Canyon (from Secret Shrine)', 'Stock Pot Inn (from East Clock Town upper)'],
                    ['Ikana Canyon (from Spring Water Cave)', 'Curiosity Shop (from Back Room)'],
                    ['Spring Water Cave (from Ikana Canyon)', 'Southern Swamp (from Woods of Mystery)'],
                    ['Pirates\'s Fortress Interior (from Exterior)', 'Mountain Village (from Path to Mountain Village)'],
                    ['Pirates\'s Fortress Interior (from Hookshot Lower)', 'Spring Water Cave (from Ikana Canyon)'],
                    ['Pirates\'s Fortress Interior (from Hookshot Upper)', 'On the Moon'],
                    ['Pirates\'s Fortress Interior (from Purple Pirate entrance)', 'Mountain Village (from Goron Graveyard)'],
                    ['Pirates\'s Fortress Interior (from Purple Pirate exit)', 'Zora Hall (from Lulu\'s Room)'],
                    ['Pirates\'s Fortress Interior (from Green Pirate entrance)', 'Snowhead Temple'],
                    ['Pirates\'s Fortress Interior (from Green Pirate exit)', 'Pirates\'s Fortress Interior (from Red Pirate entrance)'],
                    ['Pirates\'s Fortress Interior (from Red Pirate entrance) ', 'Deku Palace Garden Back Grotto'],
                    ['Pirates\'s Fortress Interior (from Red Pirate exit) ', 'Curiosity Shop (from West Clock Town)'],
                    ['Pirates\'s Fortress Interior (from Telescope)', 'Ikana Canyon (from Spring Water Cave)'],
                    ['Pirates\'s Fortress Interior (from Exiterior balcony)', 'Ikana Graveyard (from Beneath the Graveyard (Heart Piece))'],
                    ['Milk Bar', 'Romani Ranch (from Receiving Milk Bottle)'],
                    ['Stone Tower Temple', 'Ikana Graveyard (from Path to Ikana)'],
                    ['Treasure Chest Shop ', 'Pirates\'s Fortress Interior (from Green Pirate entrance)'],
                    ['Inverted Stone Tower Temple ', 'Zora Cape (from Great Bay Temple)'],
                    ['Inverted Stone Tower Temple (Boss Door) ', 'Southern Swamp (from Deku Palace Upper)'],
                    ['Woodfall Temple (from Woodfall) ', 'West Clock Town (from South Clock Town south)'],
                    ['Deku Princess\'s Room (from Clear Cutscene) ', 'Beneath the Well (from Ikana Canyon)'],
                    ['Deku Princess\'s Room (from Woodfall) ', 'Japas\'s Room (from Zora Hall)'],
                    ['Path to Mountain Village (from Termina Field) ', 'Lottery Shop'],
                    ['Path to Mountain Village (from Mountain Village)', 'Path to Snowhead (from Mountain Village)'],
                    ['Ancient Castle of Ikana (from Beneath the Well)', 'Great Bay Temple (from Pirate Cutscene)'],
                    ['Ancient Castle of Ikana (from Ikana Canyon)', 'South Clock Town (from East Clock Town north)'],
                    ['Ancient Castle of Ikana (from Castle Interior)', 'North Clock Town (from Catching all Bombers)'],
                    ['Ancient Castle of Ikana (from Castle Exterior)', 'Pirates\'s Fortress Interior (from Telescope)'],
                    ['Ancient Castle of Ikana (from Keg Hole) ', 'Bisness Deku Scrub Grotto'],
                    ['Ancient Castle of Ikana (from Hole under Block)', 'Great Bay Trial (from Murky Water)'],
                    ['Ancient Castle of Ikana (from Igo\'s Room) ', 'Ikana Canyon (from Beneath the Well)'],
                    ['Deku Playground', 'Great Bay Coast (from Pirates\'s Fortress)'],
                    ['Odolwa\'s Room ', 'West Clock Town (from Lottery Shop)'],
                    ['Shooting Gallery (Clock Town)', 'South Clock Town (from Clock Tower)'],
                    ['Snowhead Temple', 'Stone Tower Trial (from Moon)'],
                    ['Milk Road (from Termina Field)', 'South Clock Town (from West Clock Town north)'],
                    ['Milk Road (from Romani Ranch)', 'Stone Tower Temple'],
                    ['Milk Road (from Gorman Track back)', 'Pirates\'s Fortress Rooms (Sewers entrance)'],
                    ['Milk Road (from Gorman Track)', 'Zora Cape (from Song of Soaring)'],
                    ['Milk Road (from Song of Soaring)', 'Termina Field (from Milk Road)'],
                    ['Pirates\'s Fortress Rooms (Hookshot Lower)', 'Pirates\'s Fortress Exterior (from Sewers)'],
                    ['Pirates\'s Fortress Rooms (Hookshot Upper)', 'Clock Tower (from South Clock Town)'],
                    ['Pirates\'s Fortress Rooms (Purple Pirate entrance)', 'Path to Ikana (from Ikana Graveyard)'],
                    ['Pirates\'s Fortress Rooms (Purple Pirate exit)', 'Bio Baba Grotto'],
                    ['Pirates\'s Fortress Rooms (Green Pirate entrance)', 'Goht\'s Room'],
                    ['Pirates\'s Fortress Rooms (Green Pirate exit)', 'Path to the Swamp (from Shooting Gallery)'],
                    ['Pirates\'s Fortress Rooms (Red Pirate entrance) ', 'Beneath the Graveyard (Bottle)'],
                    ['Pirates\'s Fortress Rooms (Red Pirate exit) ', 'Snowhead (from Fairy\'s Fountain)'],
                    ['Pirates\'s Fortress Rooms (from Telescope)', 'Pirates\'s Fortress Exterior (from Interior)'],
                    ['Pirates\'s Fortress Rooms (Sewers entrance) ', 'Pirates\'s Fortress Rooms (Green Pirate exit)'],
                    ['Pirates\'s Fortress Rooms (Sewers exit)', 'Pirates\'s Fortress Exterior (from Interior balcony)'],
                    ['Shooting Gallery (Swamp)', 'Deku Palace (from Deku Palace Garden Front Grotto)'],
                    ['Pinnacle Rock ', 'Stock Pot Inn (from Midnight Meeting)'],
                    ['Fairy\'s Fountain (Clock Town)', 'Milk Road (from Song of Soaring)'],
                    ['Fairy\'s Fountain (Woodfall) ', 'Great Bay Coast (from Oceanside Spider House)'],
                    ['Fairy\'s Fountain (Snowhead) ', 'South Clock Town (from North Clock Town)'],
                    ['Fairy\'s Fountain (Great Bay)', 'Ancient Castle of Ikana (from Beneath the Well)'],
                    ['Fairy\'s Fountain (Ikana)', 'Goron Graveyard (from Mountain Village)'],
                    ['Swamp Spider House', 'Deku King\'s Chamber (from Deku Palace)'],
                    ['Ocean Spider House', 'Ikana Canyon (from Secret Shrine)'],
                    ['Bombers\'s Hideout', 'Odolwa\'s Room'],
                    ['Observatory (from Termina Field)', 'Zora Cape (from Zora Hall)'],
                    ['Observatory (from Telescope)', 'Cucco Shack'],
                    ['Woodfall Trial (from Moon)', 'Pirates\'s Fortress Rooms (Purple Pirate entrance)'],
                    ['Deku Palace (from Southern Swamp)', 'Fairy\'s Fountain (Ikana)'],
                    ['Deku Palace (from being thrown out) ', 'Inverted Stone Tower (from Inverted Stone Tower Temple)'],
                    ['Deku Palace (from Deku King\'s Chamber)', 'Termina Field (from Great Bay Coast)'],
                    ['Deku Palace (from Monkey cage)', 'Zora Hall (from Zora Cape back)'],
                    ['Deku Palace (from Deku Shrine)', 'Back Room (from Laundry Pool)'],
                    ['Deku Palace (from Swamp Shortcut)', 'Shooting Gallery (Clock Town)'],
                    ['Deku Palace (from Deku Palace Garden Front Grotto)', 'Deku Palace (from being thrown out)'],
                    ['Deku Palace (from Deku Palace Garden Back Grotto) ', 'Ghost Hut (from Ikana Canyon)'],
                    ['Deku Palace (from Deku Palace Garden Back Grotto) ', 'South Clock Town (from Song of Soaring)'],
                    ['Deku Palace (from Magic Bean Seller Grotto)', 'Secret Shrine'],
                    ['Deku Palace (from Deku Palace Garden Front Grotto)', 'Milk Road (from Termina Field)'],
                    ['Mountain Smithy', 'Magic Hag\'s Potion Shop (from Southern Swamp)'],
                    ['Termina Field (from West Clock Town)', 'Deku Palace (from Southern Swamp)'],
                    ['Termina Field (from Path to Southern Swamp)', 'Fairy\'s Fountain (Snowhead)'],
                    ['Termina Field (from Great Bay Coast)', 'South Clock Town (from Termina Field)'],
                    ['Termina Field (from Path to Mountain Village) ', 'Ikana Canyon (from Musicbox House)'],
                    ['Termina Field (from Path to Ikana Canyon) ', 'Goron Village (from Goron Shrine)'],
                    ['Termina Field (from Milk Road)', 'West Clock Town (from Curiosity Shop)'],
                    ['Termina Field (from South Clock Town)', 'Mikau\'s Room (from Zora Hall)'],
                    ['Termina Field (from East Clock Town)', 'Ikana Canyon (from Path to Ikana)'],
                    ['Termina Field (from North Clock Town)', 'Back Room (from Curiosity Shop)'],
                    ['Termina Field (from Observatory)', 'Pirates\'s Fortress Interior (from Purple Pirate exit)'],
                    ['Termina Field (Telescope)', 'Ikana Canyon (from Ancient Castle of Ikana)'],
                    ['Termina Field (from Milk Road with Cremia)', 'Goron Village (from Lone Peak Shrine)'],
                    ['Post Office', 'West Clock Town (from Termina Field)'],
                    ['Marine Research Lab ', 'Bombers\'s Hideout'],
                    ['Beneath the Graveyard (Bottle)', 'Zora Hall (from Zora Cape)'],
                    ['Dampe\'s Room', 'Ikana Graveyard (from Beneath the Graveyard (Song of Storms))'],
                    ['Goron Shrine (from Goron Village)', 'Pirates\'s Fortress Rooms (Hookshot Lower)'],
                    ['Goron Shrine (from Goron Shop)', 'Pirates\'s Fortress Exterior (from Sewers Draft)'],
                    ['Zora Hall (from Zora Cape)', 'Evan\'s Room (from Zora Hall)'],
                    ['Zora Hall (from Zora Cape back) ', 'Path to Goron Village (from Goron Village)'],
                    ['Zora Hall (from Zora Shop)', 'Marine Research Lab'],
                    ['Zora Hall (from Lulu\'s Room)', 'Snowhead (from Path to Snowhead/Void)'],
                    ['Zora Hall (from Evan\'s Room)', 'Ancient Castle of Ikana (from Castle Exterior)'],
                    ['Zora Hall (from Japas\'s Room)', 'Ikana Gossip Stones Grotto'],
                    ['Zora Hall (from Mikau\'s Room)', 'Music Box House'],
                    ['Zora Hall (from Band Rehearsal) ', 'Hotspring Water Grotto'],
                    ['Trading Post', 'Southern Swamp (from Deku Palace)'],
                    ['Romani Ranch (from Milk Road)', 'North Clock Town (from Bombers Hide and Seek)'],
                    ['Romani Ranch (from Barn)', 'Ikana Canyon (from Fairy Fountain)'],
                    ['Romani Ranch (from House)', 'Dampe\'s Room'],
                    ['Romani Ranch (from Cucco Shack) ', 'Gorman Racetrack (from Milk Road)'],
                    ['Romani Ranch (from Doggy Racetrack) ', 'Southern Swamp (from Magic Hag\'s Potion Shop)'],
                    ['Romani Ranch (from Receiving Milk Bottle) ', 'Great Bay Coast (from Murky Water Right)'],
                    ['Romani Ranch (from Romani being abducted) ', 'Ikana Canyon (from Sakon\'s Hideout)'],
                    ['Twinmold\'s Room', 'Deku Palace (from Deku Palace Garden Back Grotto)'],
                    ['Great Bay Coast (from Termina Field)', 'Milk Bar'],
                    ['Great Bay Coast (from Zora Cape)', 'Pirates\'s Fortress Rooms (Red Pirate exit)'],
                    ['Great Bay Coast (from Murky Water Left) ', 'Ancient Castle of Ikana (from Keg Hole)'],
                    ['Great Bay Coast (from Pinnacle Rock)', 'Goron Shrine (from Goron Village)'],
                    ['Great Bay Coast (from Fisherman\'s Hut)', 'East Clock Town (from Treasure Chest Shop)'],
                    ['Great Bay Coast (from Pirates\'s Fortress)', 'Pirates\'s Fortress Interior (from Purple Pirate entrance)'],
                    ['Great Bay Coast (from Murky Water Right)', 'Zora Hall (from Band Rehearsal)'],
                    ['Great Bay Coast (from Marine Research Lab)', 'Lulu\'s Room (from Zora Hall)'],
                    ['Great Bay Coast (from Oceanside Spider House) ', 'Post Office'],
                    ['Great Bay Coast (from Zora Mask Cutscene) ', 'Termina Field (from Milk Road with Cremia)'],
                    ['Great Bay Coast (from Song of Soaring)', 'Great Bay Gossip Stones Grotto'],
                    ['Great Bay Coast (from Pirates\'s Fortress caught)', 'Zora Hall (from Mikau\'s Room)'],
                    ['Zora Cape (from Great Bay Coast)', 'Great Bay Coast (from Song of Soaring)'],
                    ['Zora Cape (from Zora Hall)', 'Pirates\'s Fortress Interior (from Hookshot Upper)'],
                    ['Zora Cape (from Zora Hall back) ', 'Ancient Castle of Ikana (from Hole under Block)'],
                    ['Zora Cape (from Murky Water)', 'Woodfall Trial (from Moon)'],
                    ['Zora Cape (from Waterfall Rapids)', 'Great Bay Temple (from Zora Cape)'],
                    ['Zora Cape (from Fairy\'s Fountain)', 'Inverted Stone Tower Temple'],
                    ['Zora Cape (from Song of Soaring)', 'Mountain Smithy'],
                    ['Zora Cape (from Great Bay Temple)', 'Deku Princess\'s Room (from Clear Cutscene)'],
                    ['Lottery Shop', 'East Clock Town (from Honey & Darling)'],
                    ['Pirates\'s Fortress Exterior (from Great Bay Coast) ', 'Deku Palace (from Deku Palace Garden Front Grotto)'],
                    ['Pirates\'s Fortress Exterior (from Interior)', 'Honey & Darling'],
                    ['Pirates\'s Fortress Exterior (from Sewers)', 'Beneath the Graveyard (Heart Piece)'],
                    ['Pirates\'s Fortress Exterior (from Sewers Draft)', 'Fairy\'s Fountain (Great Bay)'],
                    ['Pirates\'s Fortress Exterior (from Interior caught) ', 'Great Bay Coast (from Zora Cape)'],
                    ['Pirates\'s Fortress Exterior (from Interior balcony)', 'Termina Field (from Path to Mountain Village)'],
                    ['Pirates\'s Fortress Exterior (from Sewers end)', 'South Clock Town (from East Clock Town south)'],
                    ['Fisherman\'s Hut', 'Ikana Graveyard (from Dampe\'s Room)'],
                    ['Goron Shop', 'Tourist Information'],
                    ['Deku King\'s Chamber (from Deku Palace)', 'Deku Shrine'],
                    ['Deku King\'s Chamber (from Deku Palace upper)', 'Beneath the Graveyard (Song of Storms)'],
                    ['Deku King\'s Chamber (from Deku Princess)', 'Snowhead (from Song of Soaring)'],
                    ['Deku King\'s Chamber (from Releasing Monkey)', 'Pirates\'s Fortress Interior (from Exiterior balcony)'],
                    ['Snowhead Trial (from Moon)', 'Path to Goron Village (from Mountain Village)'],
                    ['Path to the Swamp (from Termina Field)', 'Woodfall (from Woodfall Temple back)'],
                    ['Path to the Swamp (from Southern Swamp) ', 'Great Bay Coast (from Termina Field)'],
                    ['Path to the Swamp (from Shooting Gallery) ', 'East Clock Town (from North Clock Town)'],
                    ['Doggy Racetrack', 'Mountain Village (from Clear Cutscene)'],
                    ['Cucco Shack', 'Deku Palace (from Deku Palace Garden Back Grotto)'],
                    ['Ikana Graveyard (from Path to Ikana)', 'Swordsman\'s School'],
                    ['Ikana Graveyard (from Beneath the Graveyard (Bottle)) ', 'Termina Field (from East Clock Town)'],
                    ['Ikana Graveyard (from Beneath the Graveyard (Heart Piece))', 'North Clock Town (from Fairy\'s Fountain)'],
                    ['Ikana Graveyard (from Beneath the Graveyard (Song of Storms)) ', 'Goron Shop'],
                    ['Ikana Graveyard (from Dampe\'s Room) ', 'Romani Ranch (from Doggy Racetrack)'],
                    ['Ikana Graveyard (from Defeating Captain Keeta)', 'Pirates\'s Fortress Interior (from Exterior)'],
                    ['Goht\'s Room', 'Mountain Village (from Path to Snowhead)'],
                    ['Southern Swamp (from Path to Swamp) ', 'Romani Ranch (from House)'],
                    ['Southern Swamp (from Tourist Information) ', 'Milk Road (from Romani Ranch)'],
                    ['Southern Swamp (from Woodfall)', 'Pirates\'s Fortress Exterior (from Interior caught)'],
                    ['Southern Swamp (from Deku Palace)', 'Path to the Swamp (from Southern Swamp)'],
                    ['Southern Swamp (from Deku Palace Upper) ', 'Snowhead Trial (from Moon)'],
                    ['Southern Swamp (from Magic Hag\'s Potion Shop) ', 'Zora Cape (from Fairy\'s Fountain)'],
                    ['Southern Swamp (from Woods of Mystery)', 'Dodongo Grotto'],
                    ['Southern Swamp (from Swamp Spider House)', 'South Clock Town (from West Clock Town south)'],
                    ['Southern Swamp (from Ikana Canyon)', 'East Clock Town (from Shooting Gallery)'],
                    ['Southern Swamp (from Song of Soaring)', 'Woods of Mystery'],
                    ['Woodfall (from Southern Swamp)', 'Southern Swamp (from Woodfall)'],
                    ['Woodfall (from Woodfall Temple) ', 'Deku Palace (from Swamp Shortcut)'],
                    ['Woodfall (from Fairy\'s Fountain)', 'Great Bay Coast (from Marine Research Lab)'],
                    ['Woodfall (from Woodfall Temple back)', 'East Clock Town (from Stokc Pot Inn upper)'],
                    ['Woodfall (from Song of Soaring) ', 'South Clock Town (from Laundry Pool)'],
                    ['Great Bay Trial (from Moon) ', 'East Clock Town (from Milk Bar)'],
                    ['Great Bay Trial (from Murky Water)', 'Deku Palace (from Deku King\'s Chamber)'],
                    ['Great Bay Temple (from Zora Cape)', 'Path to Goron Village (from Goron Racetrack)'],
                    ['Great Bay Temple (from Pirate Cutscene) ', 'Pirates\'s Fortress Interior (from Green Pirate exit)'],
                    ['Waterfall Rapids (from Zora Cape)', 'Path to Ikana (from Termina Field)'],
                    ['Beneath the Well (from Ikana Canyon)', 'Fairy\'s Fountain (Clock Town)'],
                    ['Beneath the Well (from Ancient Castle of Ikana)', 'Shooting Gallery (Swamp)'],
                    ['Mikau\'s Room (from Zora Hall)', 'Southern Swamp (from Ikana Canyon)'],
                    ['Japas\'s Room (from Zora Hall)', 'Woodfall (from Song of Soaring)'],
                    ['Lulu\'s Room (from Zora Hall)', 'Termina Field (from West Clock Town)'],
                    ['Evan\'s Room (from Zora Hall)', 'Southern Swamp (from Path to Swamp)'],
                    ['Zora Shop ', 'Great Bay Coast (from Pinnacle Rock)'],
                    ['Goron Village (from Path to Goron Village)', 'Milk Road (from Gorman Track back)'],
                    ['Goron Village (from Goron Shrine)', 'Great Bay Coast (from Fisherman\'s Hut)'],
                    ['Goron Village (from Lone Peak Shrine)', 'Ikana Canyon (from Ghost Hut)'],
                    ['Goron Graveyard (from Mountain Village) ', 'Stone Tower (from Ikana Canyon)'],
                    ['Sakon\'s Hideout', 'Zora Hall (from Zora Shop)'],
                    ['Mountain Village (from Mountain Smithy) ', 'Romani Ranch (from Milk Road)'],
                    ['Mountain Village (from Path to Goron Village) ', 'Mayor\'s Residence (from East Clock Town)'],
                    ['Mountain Village (from Goron Graveyard) ', 'Zora Cape (from Waterfall Rapids)'],
                    ['Mountain Village (from Path to Snowhead)', 'Pirates\'s Fortress Interior (from Red Pirate exit)'],
                    ['Mountain Village (from Path to Mountain Village)', 'Inverted Stone Tower Temple (Boss Door)'],
                    ['Mountain Village (from Clear Cutscene)', 'Termina Field (from Path to Ikana Canyon)'],
                    ['Mountain Village (from Song of Soaring) ', 'Fairy\'s Fountain (Woodfall)'],
                    ['Ghost Hut (from Ikana Canyon)', 'Pirates\'s Fortress Exterior (from Great Bay Coast)'],
                    ['Deku Shrine', 'Trading Post'],
                    ['Path to Ikana (from Termina Field)', 'Great Bay Coast (from Pirates\'s Fortress caught)'],
                    ['Path to Ikana (from Ikana Graveyard)', 'Deku Playground'],
                    ['Path to Ikana (from Ikana Canyon)', 'Zora Cape (from Murky Water)'],
                    ['Swordsman\'s School', 'East Clock Town (from Mayor\'s Residence)'],
                    ['Music Box House', 'Great Bay Coast (from Zora Mask Cutscene)'],
                    ['Igos du Ikana\'s Room', 'North Clock Town (from Deku Playground)'],
                    ['Tourist Information ', 'Deku Palace (from Deku Shrine)'],
                    ['Stone Tower (from Ikana Canyon) ', 'Southern Swamp (from Song of Soaring)'],
                    ['Stone Tower (from Un-inverting) ', 'Zora Shop'],
                    ['Stone Tower (from Stone Tower Temple)', 'North Clock Town (from South Clock Town)'],
                    ['Stone Tower (from Song of Soaring)', 'Stock Pot Inn (from East Clock Town)'],
                    ['Inverted Stone Tower (from Inverting)', 'Doggy Racetrack'],
                    ['Inverted Stone Tower (from Inverted Stone Tower Temple)', 'Ikana Graveyard (from Beneath the Graveyard (Bottle))'],
                    ['Path to Snowhead (from Mountain Village)', 'Great Bay Coast (from Murky Water Left)'],
                    ['Path to Snowhead (from Snowhead)', 'Zora Cape (from Zora Hall back)'],
                    ['Snowhead (from Path to Snowhead/Void)', 'Pirates\'s Fortress Exterior (from Sewers end)'],
                    ['Snowhead (from Snowhead Temple) ', 'Ranch House (from Romani Ranch)'],
                    ['Snowhead (from Fairy\'s Fountain)', 'Deku King\'s Chamber (from Releasing Monkey)'],
                    ['Snowhead (from Song of Soaring) ', 'Stone Tower (from Un-inverting)'],
                    ['Path to Goron Village (from Mountain Village) ', 'Gorman Racetrack (from Milk Road west)'],
                    ['Path to Goron Village (from Goron Village)', 'Romani Ranch (from Romani being abducted)'],
                    ['Path to Goron Village (from Goron Racetrack)', 'Termina Field (from Observatory)'],
                    ['Gyorg\'s Room', 'Pirates\'s Fortress Rooms (Green Pirate entrance)'],
                    ['Secret Shrine ', 'Stone Tower (from Song of Soaring)'],
                    ['Stock Pot Inn (from East Clock Town)', 'East Clock Town (from South Clock Town north)'],
                    ['Stock Pot Inn (from East Clock Town upper)', 'Termina Field (Telescope)'],
                    ['Stock Pot Inn (from Midnight Meeting)', 'Southern Swamp (from Tourist Information)'],
                    ['Clock Tower (from Pre Clock Tower)', 'Deku Palace Garden Back Grotto'],
                    ['Clock Tower (from South Clock Town) ', 'Stone Tower (from Stone Tower Temple)'],
                    ['Woods of Mystery', 'Path to the Swamp (from Termina Field)'],
                    ['Stone Tower Trial (from Moon)', 'Snowhead Gossip Stones Grotto'],
                    ['On the Moon', 'Milk Road (from Gorman Track)'],
                    ['Gorman Racetrack (from Milk Road)', 'Deku King\'s Chamber (from Deku Princess)'],
                    ['Gorman Racetrack (from Milk Road west)', 'Fisherman\'s Hut'],
                    ['Goron Racetrack (from Path to Goron Village)', 'Lone Peak Shrine'],
                    ['East Clock Town (from Termina Field)', 'North Clock Town (from Termina Field)'],
                    ['East Clock Town (from South Clock Towe south) ', 'Swamp Spider House'],
                    ['East Clock Town (from Bomber\'s Hideout) ', 'Snowhead (from Snowhead Temple)'],
                    ['East Clock Town (from South Clock Town north) ', 'Ikana Canyon (from Clear Cutscene)'],
                    ['East Clock Town (from Treasure Chest Shop)', 'Goron Racetrack (from Path to Goron Village)'],
                    ['East Clock Town (from North Clock Town) ', 'Deku King\'s Chamber (from Deku Palace upper)'],
                    ['East Clock Town (from Honey & Darling)', 'Ancient Castle of Ikana (from Castle Interior)'],
                    ['East Clock Town (from Mayor\'s Residence)', 'East Clock Town (from Bomber\'s Hideout)'],
                    ['East Clock Town (from Shooting Gallery) ', 'West Clock Town (from Swordsman\'s School)'],
                    ['East Clock Town (from Stock Pot Inn)', 'East Clock Town (from South Clock Towe south)'],
                    ['East Clock Town (from Stokc Pot Inn upper)', 'Ocean Spider House'],
                    ['East Clock Town (from Milk Bar) ', 'Clock Tower (from Pre Clock Tower)'],
                    ['West Clock Town (from Termina Field)', 'East Clock Town (from Stock Pot Inn)'],
                    ['West Clock Town (from South Clock Town south) ', 'Laundry Pool (from Back Room)'],
                    ['West Clock Town (from South Clock Town north) ', 'Woodfall (from Southern Swamp)'],
                    ['West Clock Town (from Swordsman\'s School) ', 'West Clock Town (from South Clock Town north)'],
                    ['West Clock Town (from Curiosity Shop)', 'Zora Hall (from Evan\'s Room)'],
                    ['West Clock Town (from Trading Post) ', 'Pirates\'s Fortress Interior (from Hookshot Lower)'],
                    ['West Clock Town (from Post Office)', 'Deku Palace (from Monkey cage)'],
                    ['West Clock Town (from Lottery Shop) ', 'East Clock Town (from Termina Field)'],
                    ['North Clock Town (from Termina Field)', 'Majora\'s Room'],
                    ['North Clock Town (from East Clock Town) ', 'Pirates\'s Fortress Rooms (from Telescope)'],
                    ['North Clock Town (from South Clock Town)', 'Treasure Chest Shop'],
                    ['North Clock Town (from Fairy\'s Fountain)', 'Twinmold\'s Room'],
                    ['North Clock Town (from Deku Playground) ', 'Termina Field (from North Clock Town)'],
                    ['North Clock Town (from Catching all Bombers)', 'Goron Village (from Path to Goron Village)'],
                    ['North Clock Town (from Bombers Hide and Seek) ', 'Path to Ikana (from Ikana Canyon)'],
                    ['South Clock Town (from Clock Tower) ', 'Gyorg\'s Room'],
                    ['South Clock Town (from Termina Field)', 'Pirates\'s Fortress Rooms (Hookshot Upper)'],
                    ['South Clock Town (from East Clock Town north) ', 'Mountain Village (from Song of Soaring)'],
                    ['South Clock Town (from West Clock Town north) ', 'Deku Palace Garden Front Grotto'],
                    ['South Clock Town (from North Clock Town)', 'Great Bay Trial (from Moon)'],
                    ['South Clock Town (from West Clock Town south) ', 'Zora Cape (from Great Bay Coast)'],
                    ['South Clock Town (from Laundry Pool)', 'Mountain Village (from Mountain Smithy)'],
                    ['South Clock Town (from East Clock Town south) ', 'Romani Ranch (from Barn)'],
                    ['South Clock Town (from Song of Soaring) ', 'West Clock Town (from Trading Post)'],
                    ['Laundry Pool (from South Clock Town)', 'Path to Mountain Village (from Mountain Village)'],
                    ['Laundry Pool (from Back Room)', 'Beneath the Well (from Ancient Castle of Ikana)'],

                ],
                collection: [],
                showNotification: false,
                message: null,
                graph: {
                    nodes: [],
                    adjacencyList: {},
                },
                timeOutId: null,
            };
        },
        mounted() {
            this.toLocations.forEach(node => {
                this.addNode(node);
            });
            // this.testEdges.forEach(pair => {
            //     this.addEdge(this.getAliasName(pair[0]), this.getAliasName(pair[1]))
            // })
        },
        methods: {
            handleNotificationClose(){
                this.showNotification = false;
                this.message = null;
                this.timeOutId = null;
            },
            removeIndexFromAdjacencyList(edgeIndex, nodeIndex) {
                this.graph.adjacencyList[nodeIndex].splice(edgeIndex, 1);
                this.$forceUpdate();
            },
            addNode(node) {
                this.graph.nodes.push(node);
                this.graph.adjacencyList[node] = [];
            },
            handleShortestPathFromUpdate(location) {
                this.selectedShortestPathFrom = location;
            },
            handleShortestPathToUpdate(location) {
                this.selectedShortestPathTo = location;
            },
            handleSearchFromUpdate(location) {
                this.selectedNewFrom = location;
            },
            handleSearchToUpdate(location) {
                this.selectedNewTo = location;
            },
            addEdge(node1, node2, weight = 1) {
                for (let i = 0; i < this.graph.adjacencyList[node1].length; i++) {
                    if (this.graph.adjacencyList[node1][i].node === node2) {
                        return false;
                    }
                }
                this.graph.adjacencyList[node1].push({node: node2, weight: weight});
                return true;
            },
            getAliasName(name) {
                let tmpName = name.split('from ')[1];
                if (tmpName === undefined) {
                    tmpName = name;
                } else {
                    tmpName = tmpName.split(')')[0];
                }
                return tmpName.trim();
            },
            addLocation() {
                let result = this.addEdge(this.selectedNewTo, this.selectedNewFrom);
                this.showNotification = true;
                if (result) {
                    this.message = 'Added New Location. Enter ' + this.selectedNewFrom + ' goes to ' + this.selectedNewTo;
                }
                if(this.timeOutId !== null){
                    clearTimeout(this.timeOutId);
                    this.timeOutId = null
                }
                this.timeOutId = setTimeout(() => {
                    this.showNotification = false;
                    this.message = null;
                }, 5000);
                // this.vertices.forEach(node => {
                //     if (this.getAliasName(node.name) === this.selectedNewTo) {
                //         this.addEdge(node, this.selectedNewFrom);
                //     }
                // });
                this.selectedNewFrom = null;
                this.selectedNewTo = null;
            },
        },
    };
</script>

<style scoped>

</style>

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
                <p class="mt-1 text-sm leading-5 text-gray-500">
                    Start by typing a location in one of the below input fields.
                </p>
            </div>
            <div class="flex mt-4 p-4">
                <div class="flex-1 mr-2 relative">
                    <SearchLocations label="Enter" :options="fromLocations" :selected-search="selectedNewFrom"
                        placeholder="Curiosity Shop (from Back Room)" @selected="handleSearchFromUpdate"
                    />
                </div>

                <div class="flex-1 ml-2 relative">
                    <SearchLocations label="Exit" :options="toLocations" :selected-search="selectedNewTo"
                        placeholder="Termina Field" @selected="handleSearchToUpdate"
                    />
                </div>
            </div>
            <div class="text-right mt-4 p-4">
                <span class="ml-3 inline-flex rounded-md shadow-sm">
                    <button type="submit"
                        class="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out disabled:opacity-25 disabled:cursor-not-allowed"
                        :disabled="Object.entries(selectedNewTo).length === 0 || Object.entries(selectedNewFrom).length === 0" @click="addLocation"
                    >
                        Add
                    </button>
                </span>
            </div>
        </div>

        <div class="bg-white shadow rounded-lg mt-4">
            <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 class="text-lg leading-6 font-medium text-gray-90">
                    Shortest Path
                </h3>
                <p class="mt-1 text-sm leading-5 text-gray-500">
                    Are you lost? Maybe we can find a path for you. Type your location below and where you want to go.
                </p>
            </div>
            <div class="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-600 p-4" role="alert">
                <p class="font-bold">
                    Warning
                </p>
                <p>This is an experimental feature and the path provided may be inaccurate.</p>
            </div>
            <div class="flex mt-4 p-4">
                <div class="flex-1 mr-2 relative">
                    <SearchLocations label="From" :options="toLocations" :selected-search="selectedShortestPathFrom"
                        placeholder="Zora Cape" @selected="handleShortestPathFromUpdate"
                    />
                </div>

                <div class="flex-1 ml-2 relative">
                    <SearchLocations label="To" :options="toLocations" :selected-search="selectedShortestPathTo"
                        placeholder="Termina Field" @selected="handleShortestPathToUpdate"
                    />
                </div>
            </div>
            <div class="text-right mt-4 p-4">
                <span class="ml-3 inline-flex rounded-md shadow-sm">
                    <button type="submit"
                        class="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out disabled:opacity-25 disabled:cursor-not-allowed"
                        :disabled="Object.entries(selectedShortestPathFrom).length === 0 || Object.entries(selectedShortestPathTo).length === 0" @click="findShortestPath"
                    >
                        Find Shortest Path
                    </button>
                </span>
            </div>
            <div v-if="shortestPath.length" class="p-4">
                <div class="flex items-center text-sm leading-5 font-medium mt-4">
                    <div v-for="(location, key) in shortestPath" :key="key" class="flex items-center">
                        <span class="text-gray-500 hover:text-gray-700 focus:outline-none focus:underline transition duration-150 ease-in-out">{{ location.alias }}</span>
                        <svg v-if="key !== shortestPath.length -1" class="flex-shrink-0 mx-2 h-5 w-5 text-gray-400" fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>

        <div class="rounded-lg mt-4 shadow">
            <div class="px-4 py-5 border-b border-gray-200 sm:px-6 bg-white rounded-t-lg">
                <h3 class="text-lg leading-6 font-medium text-gray-90">
                    Known Locations
                </h3>
                <p class="mt-1 text-sm leading-5 text-gray-500">
                    Locations added above will appear here.
                </p>
            </div>
            <div class="flex flex-col bg-white">
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
                                <tr v-for="(n, nodeIndex) in graph.adjacencyList" v-show="graph.adjacencyList[nodeIndex].length" :key="nodeIndex">
                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 font-medium text-gray-900 w-2/5">
                                        {{ nodeIndex }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 font-medium text-gray-900 w-3/5">
                                        <table class="w-full">
                                            <tr v-for="(node, edgeIndex) in n" :key="nodeIndex+'edge'+edgeIndex">
                                                <td class="w-4/5">
                                                    {{ node.name }}
                                                </td>
                                                <td class="flex-1">
                                                    <button class="text-red-500" @click="openModal(edgeIndex, nodeIndex, node.name)">
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
        <DeleteModal :open="showDeleteModal" :location="openedNodeName" @confirm-delete="removeIndexFromAdjacencyList"
            @cancel="resetCloseModal"
        />
    </div>
</template>

<script>
    import SearchLocations from "./SearchLocations";
    import Notification from "./Notification";
    import DeleteModal from "./DeleteModal";

    export default {
        name: "Helper",
        components: {DeleteModal, Notification, SearchLocations},
        data() {
            return {
                openedEdgeIndex: null,
                openedNodeIndex: null,
                openedNodeName: null,
                showDeleteModal: false,
                shortestPath: [],
                selectedNewFrom: {},
                selectedNewTo: {},
                selectedShortestPathFrom: {},
                selectedShortestPathTo: {},
                fromLocations: [
                    {node: "Mayor's Residence (from East Clock Town)", alias: "Mayor's Residence"},
                    {node: "Majora's Room", alias: "Majora's Room"},
                    {node: "Magic Hag's Potion Shop (from Southern Swamp)", alias: "Magic Hag's Potion Shop"},
                    {node: "Ranch Barn (from Romani Ranch)", alias: "Ranch Barn"},
                    {node: "Ranch House (from Romani Ranch)", alias: "Ranch House"},
                    {node: "Honey & Darling", alias: "Honey & Darling"},
                    {node: "Beneath the Graveyard (Heart Piece)", alias: "Beneath the Graveyard (Heart Piece)"},
                    {node: "Beneath the Graveyard (Song of Storms)", alias: "Beneath the Graveyard (Song of Storms)"},
                    {node: "Curiosity Shop (from West Clock Town)", alias: "Curiosity Shop"},
                    {node: "Back Room (from Laundry Pool)", alias: "Back Room"},
                    {node: "Generic Grotto (from Path to the Swamp)", alias: "Generic Grotto (from Path to the Swamp)"},
                    {node: "Generic Grotto (from Southern Swamp)", alias: "Generic Grotto (from Southern Swamp)"},
                    {node: "Great Bay Gossip Stones Grotto", alias: "Great Bay Gossip Stones Grotto"},
                    {node: "Swamp Gossip Stones Grotto", alias: "Swamp Gossip Stones Grotto"},
                    {node: "Ikana Gossip Stones Grotto", alias: "Ikana Gossip Stones Grotto"},
                    {node: "Snowhead Gossip Stones Grotto", alias: "Snowhead Gossip Stones Grotto"},
                    {node: "Generic Grotto (from Termina Field Grass)", alias: "Generic Grotto (from Termina Field Grass)"},
                    {node: "Hotspring Water Grotto", alias: "Hotspring Water Grotto"},
                    {node: "Dodongo Grotto", alias: "Dodongo Grotto"},
                    {node: "Bisness Deku Scrub Grotto", alias: "Bisness Deku Scrub Grotto"},
                    {node: "Cow Grotto (from Termina Field)", alias: "Cow Grotto (from Termina Field)"},
                    {node: "Bio Baba Grotto", alias: "Bio Baba Grotto"},
                    {node: "Magic Bean Seller Grotto", alias: "Magic Bean Seller Grotto"},
                    {node: "Peahat Grotto", alias: "Peahat Grotto"},
                    {node: "Lone Peak Shrine", alias: "Lone Peak Shrine"},
                    {node: "Generic Grotto (from Woods of Mystery)", alias: "Generic Grotto (from Woods of Mystery)"},
                    {node: "Generic Grotto (from Path to Goron Village)", alias: "Generic Grotto (from Path to Goron Village)"},
                    {node: "Generic Grotto (from Path to Snowhead)", alias: "Generic Grotto (from Path to Snowhead)"},
                    {node: "Generic Grotto (from Mountain Village)", alias: "Generic Grotto (from Mountain Village)"},
                    {node: "Ikana Canyon (from Path to Ikana)", alias: "Ikana Canyon"},
                    {node: "Ikana Canyon (from Ghost Hut)", alias: "Ikana Canyon"},
                    {node: "Ikana Canyon (from Musicbox House)", alias: "Ikana Canyon"},
                    {node: "Ikana Canyon (from Stone Tower)", alias: "Ikana Canyon"},
                    {node: "Ikana Canyon (from Song of Soaring)", alias: "Ikana Canyon"},
                    {node: "Ikana Canyon (from Beneath the Well)", alias: "Ikana Canyon"},
                    {node: "Ikana Canyon (from Sakon's Hideout)", alias: "Ikana Canyon"},
                    {node: "Ikana Canyon (from Clear Cutscene)", alias: "Ikana Canyon"},
                    {node: "Ikana Canyon (from Ancient Castle of Ikana)", alias: "Ikana Canyon"},
                    {node: "Spring Water Cave (from Farewell to Gibdos)", alias: "Spring Water Cave"},
                    {node: "Ikana Canyon (from Fairy Fountain)", alias: "Ikana Canyon"},
                    {node: "Ikana Canyon (from Secret Shrine)", alias: "Ikana Canyon"},
                    {node: "Ikana Canyon (from Spring Water Cave)", alias: "Ikana Canyon"},
                    {node: "Spring Water Cave (from Ikana Canyon)", alias: "Spring Water Cave"},
                    {node: "Ikana Canyon (from Twinmold)", alias: "Ikana Canyon"},
                    {node: "Ikana Canyon (Generic Grotto)", alias: "Ikana Canyon"},
                    {node: "Pirates' Fortress Interior (from Exterior)", alias: "Pirates' Fortress Interior"},
                    {node: "Pirates' Fortress Interior (from Hookshot Lower)", alias: "Pirates' Fortress Interior"},
                    {node: "Pirates' Fortress Interior (from Hookshot Upper)", alias: "Pirates' Fortress Interior"},
                    {node: "Pirates' Fortress Interior (from Purple Pirate entrance)", alias: "Pirates' Fortress Interior"},
                    {node: "Pirates' Fortress Interior (from Purple Pirate exit)", alias: "Pirates' Fortress Interior"},
                    {node: "Pirates' Fortress Interior (from Green Pirate entrance)", alias: "Pirates' Fortress Interior"},
                    {node: "Pirates' Fortress Interior (from Green Pirate exit)", alias: "Pirates' Fortress Interior"},
                    {node: "Pirates' Fortress Interior (from Red Pirate entrance)", alias: "Pirates' Fortress Interior"},
                    {node: "Pirates' Fortress Interior (from Red Pirate exit)", alias: "Pirates' Fortress Interior"},
                    {node: "Pirates' Fortress Interior (from Exiterior balcony)", alias: "Pirates' Fortress Interior"},
                    {node: "Milk Bar", alias: "Milk Bar"},
                    {node: "Stone Tower Temple", alias: "Stone Tower Temple"},
                    {node: "Treasure Chest Shop", alias: "Treasure Chest Shop"},
                    {node: "Inverted Stone Tower Temple", alias: "Inverted Stone Tower Temple"},
                    {node: "Inverted Stone Tower Temple (Boss Door)", alias: "Inverted Stone Tower Temple (Boss Door)"},
                    {node: "Top of the Clock Tower", alias: "Top of the Clock Tower"},
                    {node: "Pre Clock Tower (from Clock Tower)", alias: "Pre Clock Tower"},
                    {node: "Pre Clock Tower (from Fall to Termina)", alias: "Pre Clock Tower"},
                    {node: "Pre Clock Tower (from Void)", alias: "Pre Clock Tower"},
                    {node: "Woodfall Temple (from Woodfall)", alias: "Woodfall Temple"},
                    {node: "Deku Princess' Room (from Odolwa)", alias: "Deku Princess' Room"},
                    {node: "Deku Princess' Room (from Woodfall)", alias: "Deku Princess' Room"},
                    {node: "Path to Mountain Village (from Termina Field)", alias: "Path to Mountain Village"},
                    {node: "Path to Mountain Village (from Mountain Village)", alias: "Path to Mountain Village"},
                    {node: "Ancient Castle of Ikana (from Beneath the Well)", alias: "Ancient Castle of Ikana"},
                    {node: "Ancient Castle of Ikana (from Ikana Canyon)", alias: "Ancient Castle of Ikana"},
                    {node: "Ancient Castle of Ikana (from Castle Interior)", alias: "Ancient Castle of Ikana"},
                    {node: "Ancient Castle of Ikana (from Castle Exterior)", alias: "Ancient Castle of Ikana"},
                    {node: "Ancient Castle of Ikana (from Keg Hole)", alias: "Ancient Castle of Ikana"},
                    {node: "Ancient Castle of Ikana (from Hole under Block)", alias: "Ancient Castle of Ikana"},
                    {node: "Ancient Castle of Ikana (from Igo's Room)", alias: "Ancient Castle of Ikana"},
                    {node: "Deku Playground", alias: "Deku Playground"},
                    {node: "Odolwa's Room", alias: "Odolwa's Room"},
                    {node: "Shooting Gallery (Clock Town)", alias: "Shooting Gallery (Clock Town)"},
                    {node: "Snowhead Temple", alias: "Snowhead Temple"},
                    {node: "Milk Road (from Termina Field)", alias: "Milk Road"},
                    {node: "Milk Road (from Romani Ranch)", alias: "Milk Road"},
                    {node: "Milk Road (from Gorman Track back)", alias: "Milk Road"},
                    {node: "Milk Road (from Gorman Track)", alias: "Milk Road"},
                    {node: "Milk Road (from Song of Soaring)", alias: "Milk Road"},
                    {node: "Pirates' Fortress Rooms (Hookshot Lower)", alias: "Pirates' Fortress Rooms (Hookshot Lower)"},
                    {node: "Pirates' Fortress Rooms (Hookshot Upper)", alias: "Pirates' Fortress Rooms (Hookshot Upper)"},
                    {node: "Pirates' Fortress Rooms (Purple Pirate entrance)", alias: "Pirates' Fortress Rooms (Purple Pirate entrance)"},
                    {node: "Pirates' Fortress Rooms (Purple Pirate exit)", alias: "Pirates' Fortress Rooms (Purple Pirate exit)"},
                    {node: "Pirates' Fortress Rooms (Green Pirate entrance)", alias: "Pirates' Fortress Rooms (Green Pirate entrance)"},
                    {node: "Pirates' Fortress Rooms (Green Pirate exit)", alias: "Pirates' Fortress Rooms (Green Pirate exit)"},
                    {node: "Pirates' Fortress Rooms (Red Pirate entrance)", alias: "Pirates' Fortress Rooms (Red Pirate entrance)"},
                    {node: "Pirates' Fortress Rooms (Red Pirate exit)", alias: "Pirates' Fortress Rooms (Red Pirate exit)"},
                    {node: "Pirates' Fortress Rooms (Sewers entrance)", alias: "Pirates' Fortress Rooms (Sewers entrance)"},
                    {node: "Pirates' Fortress Rooms (Sewers exit)", alias: "Pirates' Fortress Rooms (Sewers exit)"},
                    {node: "Shooting Gallery (Swamp)", alias: "Shooting Gallery (Swamp)"},
                    {node: "Pinnacle Rock", alias: "Pinnacle Rock"},
                    {node: "Pinnacle Rock (Void)", alias: "Pinnacle Rock"},
                    {node: "Fairy's Fountain (Clock Town)", alias: "Fairy's Fountain (Clock Town)"},
                    {node: "Fairy's Fountain (Woodfall)", alias: "Fairy's Fountain (Woodfall)"},
                    {node: "Fairy's Fountain (Snowhead)", alias: "Fairy's Fountain (Snowhead)"},
                    {node: "Fairy's Fountain (Great Bay)", alias: "Fairy's Fountain (Great Bay)"},
                    {node: "Fairy's Fountain (Ikana)", alias: "Fairy's Fountain (Ikana)"},
                    {node: "Swamp Spider House", alias: "Swamp Spider House"},
                    {node: "Ocean Spider House", alias: "Ocean Spider House"},
                    {node: "Bombers' Hideout", alias: "Bombers' Hideout"},
                    {node: "Observatory (from Termina Field)", alias: "Observatory"},
                    {node: "Woodfall Trial (from Moon)", alias: "Woodfall Trial"},
                    {node: "Deku Palace (from Southern Swamp)", alias: "Deku Palace"},
                    {node: "Deku Palace (from being thrown out)", alias: "Deku Palace"},
                    {node: "Deku Palace (from Deku King's Chamber)", alias: "Deku Palace"},
                    {node: "Deku Palace (from Monkey cage)", alias: "Deku Palace"},
                    {node: "Deku Palace (from Deku Shrine)", alias: "Deku Palace"},
                    {node: "Deku Palace (from Swamp Shortcut)", alias: "Deku Palace"},
                    {node: "Deku Palace (from Magic Bean Seller Grotto)", alias: "Deku Palace"},
                    {node: "Mountain Smithy", alias: "Mountain Smithy"},
                    {node: "Termina Field (from West Clock Town)", alias: "Termina Field"},
                    {node: "Termina Field (from Path to Southern Swamp)", alias: "Termina Field"},
                    {node: "Termina Field (from Great Bay Coast)", alias: "Termina Field"},
                    {node: "Termina Field (from Path to Mountain Village)", alias: "Termina Field"},
                    {node: "Termina Field (from Path to Ikana Canyon)", alias: "Termina Field"},
                    {node: "Termina Field (from Milk Road)", alias: "Termina Field"},
                    {node: "Termina Field (from South Clock Town)", alias: "Termina Field"},
                    {node: "Termina Field (from East Clock Town)", alias: "Termina Field"},
                    {node: "Termina Field (from North Clock Town)", alias: "Termina Field"},
                    {node: "Termina Field (from Observatory)", alias: "Termina Field"},
                    {node: "Termina Field (from Cow Grotto)", alias: "Termina Field"},
                    {node: "Termina Field (from Milk Road with Cremia)", alias: "Termina Field"},
                    {node: "Termina Field (from Skull Kid Cutscene)", alias: "Termina Field"},
                    {node: "Termina Field (from Grass Generic Grotto)", alias: "Termina Field"},
                    {node: "Termina Field (from Pillar Generic Grotto)", alias: "Termina Field"},
                    {node: "Termina Field (from Business Scrub Grotto)", alias: "Termina Field"},
                    {node: "Termina Field (from Peahat Grotto)", alias: "Termina Field"},
                    {node: "Termina Field (from Dodongo Grotto)", alias: "Termina Field"},
                    {node: "Termina Field (from Biobaba Grotto)", alias: "Termina Field"},
                    {node: "Termina Field (from Swamp Gossips Grotto)", alias: "Termina Field"},
                    {node: "Termina Field (from Mountain Gossips Grotto)", alias: "Termina Field"},
                    {node: "Termina Field (from Ocean Gossips Grotto)", alias: "Termina Field"},
                    {node: "Termina Field (from Canyon Gossips Grotto)", alias: "Termina Field"},
                    {node: "Post Office", alias: "Post Office"},
                    {node: "Marine Research Lab", alias: "Marine Research Lab"},
                    {node: "Beneath the Graveyard (Bottle)", alias: "Beneath the Graveyard (Bottle)"},
                    {node: "Beneath the Graveyard (Dampe's Room)", alias: "Beneath the Graveyard (Dampe's Room)"},
                    {node: "Generic Grotto (from Great Bay Coast)", alias: "Generic Grotto (from Great Bay Coast)"},
                    {node: "Cow Grotto (from Great Bay Coast)", alias: "Cow Grotto (from Great Bay Coast)"},
                    {node: "Goron Shrine (from Goron Village)", alias: "Goron Shrine"},
                    {node: "Goron Shrine (from Goron Shop)", alias: "Goron Shrine"},
                    {node: "Goron Shrine (from Goron Lullaby)", alias: "Goron Shrine"},
                    {node: "Zora Hall (from Zora Cape)", alias: "Zora Hall"},
                    {node: "Zora Hall (from Zora Cape back)", alias: "Zora Hall"},
                    {node: "Zora Hall (from Zora Shop)", alias: "Zora Hall"},
                    {node: "Zora Hall (from Lulu's Room)", alias: "Zora Hall"},
                    {node: "Zora Hall (from Evan's Room)", alias: "Zora Hall"},
                    {node: "Zora Hall (from Japas' Room)", alias: "Zora Hall"},
                    {node: "Zora Hall (from Mikau's Room)", alias: "Zora Hall"},
                    {node: "Zora Hall (from Band Rehearsal)", alias: "Zora Hall"},
                    {node: "Trading Post", alias: "Trading Post"},
                    {node: "Romani Ranch (from Milk Road)", alias: "Romani Ranch"},
                    {node: "Romani Ranch (from Barn)", alias: "Romani Ranch"},
                    {node: "Romani Ranch (from House)", alias: "Romani Ranch"},
                    {node: "Romani Ranch (from Cucco Shack)", alias: "Romani Ranch"},
                    {node: "Romani Ranch (from Doggy Racetrack)", alias: "Romani Ranch"},
                    {node: "Romani Ranch (from Receiving Milk Bottle)", alias: "Romani Ranch"},
                    {node: "Romani Ranch (from Failing Cart Ride)", alias: "Romani Ranch"},
                    {node: "Romani Ranch (from Romani being abducted)", alias: "Romani Ranch"},
                    {node: "Twinmold's Room", alias: "Twinmold's Room"},
                    {node: "Great Bay Coast (from Termina Field)", alias: "Great Bay Coast"},
                    {node: "Great Bay Coast (from Zora Cape)", alias: "Great Bay Coast"},
                    {node: "Great Bay Coast (from Murky Water Left)", alias: "Great Bay Coast"},
                    {node: "Great Bay Coast (from Pinnacle Rock)", alias: "Great Bay Coast"},
                    {node: "Great Bay Coast (from Fisherman's Hut)", alias: "Great Bay Coast"},
                    {node: "Great Bay Coast (from Pirates' Fortress)", alias: "Great Bay Coast"},
                    {node: "Great Bay Coast (from Murky Water Right)", alias: "Great Bay Coast"},
                    {node: "Great Bay Coast (from Marine Research Lab)", alias: "Great Bay Coast"},
                    {node: "Great Bay Coast (from Oceanside Spider House)", alias: "Great Bay Coast"},
                    {node: "Great Bay Coast (from Zora Mask Cutscene)", alias: "Great Bay Coast"},
                    {node: "Great Bay Coast (from Song of Soaring)", alias: "Great Bay Coast"},
                    {node: "Great Bay Coast (from Pirates' Fortress caught)", alias: "Great Bay Coast"},
                    {node: "Great Bay Coast (from Generic Grotto)", alias: "Great Bay Coast"},
                    {node: "Great Bay Coast (from Cow Grotto)", alias: "Great Bay Coast"},
                    {node: "Zora Cape (from Great Bay Coast)", alias: "Zora Cape"},
                    {node: "Zora Cape (from Zora Hall)", alias: "Zora Cape"},
                    {node: "Zora Cape (from Zora Hall back)", alias: "Zora Cape"},
                    {node: "Zora Cape (from Murky Water)", alias: "Zora Cape"},
                    {node: "Zora Cape (from Waterfall Rapids)", alias: "Zora Cape"},
                    {node: "Zora Cape (from Fairy's Fountain)", alias: "Zora Cape"},
                    {node: "Zora Cape (from Song of Soaring)", alias: "Zora Cape"},
                    {node: "Zora Cape (from Great Bay Temple)", alias: "Zora Cape"},
                    {node: "Zora Cape (from Gyorg)", alias: "Zora Cape"},
                    {node: "Zora Cape (from Gyorg) (2)", alias: "Zora Cape"},
                    {node: "Zora Cape (from Generic Grotto)", alias: "Zora Cape"},
                    {node: "Lottery Shop", alias: "Lottery Shop"},
                    {node: "Generic Grotto (from Zora Cape)", alias: "Generic Grotto (from Zora Cape)"},
                    {node: "Pirates' Fortress Exterior (from Great Bay Coast)", alias: "Pirates' Fortress Exterior"},
                    {node: "Pirates' Fortress Exterior (from Interior)", alias: "Pirates' Fortress Exterior"},
                    {node: "Pirates' Fortress Exterior (from Water Tunnel)", alias: "Pirates' Fortress Exterior"},
                    {node: "Pirates' Fortress Exterior (from Sewers Draft)", alias: "Pirates' Fortress Exterior"},
                    {node: "Pirates' Fortress Exterior (from Interior Thrown Out)", alias: "Pirates' Fortress Exterior"},
                    {node: "Pirates' Fortress Exterior (from Interior Balcony)", alias: "Pirates' Fortress Exterior"},
                    {node: "Pirates' Fortress Exterior (from Telescope)", alias: "Pirates' Fortress Exterior"},
                    {node: "Fisherman's Hut", alias: "Fisherman's Hut"},
                    {node: "Goron Shop", alias: "Goron Shop"},
                    {node: "Deku King's Chamber (from Deku Palace)", alias: "Deku King's Chamber"},
                    {node: "Deku King's Chamber (from Deku Palace upper)", alias: "Deku King's Chamber"},
                    {node: "Deku King's Chamber (from Returning Deku Princess)", alias: "Deku King's Chamber"},
                    {node: "Snowhead Trial (from Moon)", alias: "Snowhead Trial"},
                    {node: "Path to the Swamp (from Termina Field)", alias: "Path to the Swamp"},
                    {node: "Path to the Swamp (from Southern Swamp)", alias: "Path to the Swamp"},
                    {node: "Path to the Swamp (from Shooting Gallery)", alias: "Path to the Swamp"},
                    {node: "Path to the Swamp (from Generic Grotto)", alias: "Path to the Swamp"},
                    {node: "Doggy Racetrack", alias: "Doggy Racetrack"},
                    {node: "Cucco Shack", alias: "Cucco Shack"},
                    {node: "Ikana Graveyard (from Path to Ikana)", alias: "Ikana Graveyard"},
                    {node: "Ikana Graveyard (from Beneath the Graveyard (Bottle))", alias: "Ikana Graveyard"},
                    {node: "Ikana Graveyard (from Beneath the Graveyard (Heart Piece))", alias: "Ikana Graveyard"},
                    {node: "Ikana Graveyard (from Beneath the Graveyard (Song of Storms))", alias: "Ikana Graveyard"},
                    {node: "Ikana Graveyard (from Dampe's Room)", alias: "Ikana Graveyard"},
                    {node: "Ikana Graveyard (from Generic Grotto)", alias: "Ikana Graveyard"},
                    {node: "Goht's Room", alias: "Goht's Room"},
                    {node: "Southern Swamp (from Path to Swamp)", alias: "Southern Swamp"},
                    {node: "Southern Swamp (from Tourist Information)", alias: "Southern Swamp"},
                    {node: "Southern Swamp (from Woodfall)", alias: "Southern Swamp"},
                    {node: "Southern Swamp (from Deku Palace)", alias: "Southern Swamp"},
                    {node: "Southern Swamp (from Deku Palace Upper)", alias: "Southern Swamp"},
                    {node: "Southern Swamp (from Magic Hag's Potion Shop)", alias: "Southern Swamp"},
                    {node: "Southern Swamp (from Woods of Mystery)", alias: "Southern Swamp"},
                    {node: "Southern Swamp (from Swamp Spider House)", alias: "Southern Swamp"},
                    {node: "Southern Swamp (from Ikana Canyon)", alias: "Southern Swamp"},
                    {node: "Southern Swamp (from Song of Soaring)", alias: "Southern Swamp"},
                    {node: "Southern Swamp (from Generic Grotto)", alias: "Southern Swamp"},
                    {node: "Woodfall (from Southern Swamp)", alias: "Woodfall"},
                    {node: "Woodfall (from Woodfall Temple)", alias: "Woodfall"},
                    {node: "Woodfall (from Fairy's Fountain)", alias: "Woodfall"},
                    {node: "Woodfall (from Woodfall Temple back)", alias: "Woodfall"},
                    {node: "Woodfall (from Song of Soaring)", alias: "Woodfall"},
                    {node: "Great Bay Trial (from Moon)", alias: "Great Bay Trial"},
                    {node: "Great Bay Trial (from Murky Water)", alias: "Great Bay Trial"},
                    {node: "Great Bay Temple (from Zora Cape)", alias: "Great Bay Temple"},
                    {node: "Waterfall Rapids (from Zora Cape)", alias: "Waterfall Rapids"},
                    {node: "Beneath the Well (from Ikana Canyon)", alias: "Beneath the Well"},
                    {node: "Beneath the Well (from Ancient Castle of Ikana)", alias: "Beneath the Well"},
                    {node: "Mikau's Room (from Zora Hall)", alias: "Mikau's Room"},
                    {node: "Japas' Room (from Zora Hall)", alias: "Japas' Room"},
                    {node: "Lulu's Room (from Zora Hall)", alias: "Lulu's Room"},
                    {node: "Evan's Room (from Zora Hall)", alias: "Evan's Room"},
                    {node: "Japas' Room (from Jam Session)", alias: "Japas' Room"},
                    {node: "Zora Shop", alias: "Zora Sho"},
                    {node: "Goron Village (from Path to Goron Village)", alias: "Goron Village"},
                    {node: "Goron Village (from Goron Shrine)", alias: "Goron Village"},
                    {node: "Goron Village (from Lone Peak Shrine)", alias: "Goron Village"},
                    {node: "Goron Graveyard (from Mountain Village)", alias: "Goron Graveyard"},
                    {node: "Sakon's Hideout", alias: "Sakon's Hideout"},
                    {node: "Mountain Village (from Mountain Smithy)", alias: "Mountain Village"},
                    {node: "Mountain Village (from Path to Goron Village)", alias: "Mountain Village"},
                    {node: "Mountain Village (from Goron Graveyard)", alias: "Mountain Village"},
                    {node: "Mountain Village (from Path to Snowhead)", alias: "Mountain Village"},
                    {node: "Mountain Village (from Generic Grotto)", alias: "Mountain Village"},
                    {node: "Mountain Village (from Path to Mountain Village)", alias: "Mountain Village"},
                    {node: "Mountain Village (from Goht)", alias: "Mountain Village"},
                    {node: "Mountain Village (from Song of Soaring)", alias: "Mountain Village"},
                    {node: "Ghost Hut (from Ikana Canyon)", alias: "Ghost Hut"},
                    {node: "Deku Shrine", alias: "Deku Shrine"},
                    {node: "Path to Ikana (from Termina Field)", alias: "Path to Ikana"},
                    {node: "Path to Ikana (from Ikana Graveyard)", alias: "Path to Ikana"},
                    {node: "Path to Ikana (from Ikana Canyon)", alias: "Path to Ikana"},
                    {node: "Path to Ikana (from Generic Grotto)", alias: "Path to Ikana"},
                    {node: "Swordsman's School", alias: "Swordsman's School"},
                    {node: "Music Box House", alias: "Music Box House"},
                    {node: "Igos du Ikana's Room", alias: "Igos du Ikana's Room"},
                    {node: "Tourist Information", alias: "Tourist Information"},
                    {node: "Tourist Information (from Boat Cruise Picture)", alias: "Tourist Information"},
                    {node: "Stone Tower (from Ikana Canyon)", alias: "Stone Tower"},
                    {node: "Stone Tower (from Un-inverting)", alias: "Stone Tower"},
                    {node: "Stone Tower (from Stone Tower Temple)", alias: "Stone Tower"},
                    {node: "Stone Tower (from Song of Soaring)", alias: "Stone Tower"},
                    {node: "Inverted Stone Tower (from Inverting)", alias: "Inverted Stone Tower"},
                    {node: "Inverted Stone Tower (from Inverted Stone Tower Temple)", alias: "Inverted Stone Tower"},
                    {node: "Path to Snowhead (from Mountain Village)", alias: "Path to Snowhead"},
                    {node: "Path to Snowhead (from Snowhead)", alias: "Path to Snowhead"},
                    {node: "Path to Snowhead (from Generic Grotto)", alias: "Path to Snowhead"},
                    {node: "Snowhead (from Path to Snowhead/Void)", alias: "Snowhead"},
                    {node: "Snowhead (from Snowhead Temple)", alias: "Snowhead"},
                    {node: "Snowhead (from Fairy's Fountain)", alias: "Snowhead"},
                    {node: "Snowhead (from Song of Soaring)", alias: "Snowhead"},
                    {node: "Path to Goron Village (from Mountain Village)", alias: "Path to Goron Village"},
                    {node: "Path to Goron Village (from Goron Village)", alias: "Path to Goron Village"},
                    {node: "Path to Goron Village (from Goron Racetrack)", alias: "Path to Goron Village"},
                    {node: "Path to Goron Village (from Generic Grotto)", alias: "Path to Goron Village"},
                    {node: "Path to Goron Village (from Hotspring Grotto)", alias: "Path to Goron Village"},
                    {node: "Gyorg's Room", alias: "Gyorg's Room"},
                    {node: "Secret Shrine", alias: "Secret Shrine"},
                    {node: "Stock Pot Inn (from East Clock Town)", alias: "Stock Pot Inn"},
                    {node: "Stock Pot Inn (from East Clock Town upper)", alias: "Stock Pot Inn"},
                    {node: "Stock Pot Inn (from Midnight Meeting)", alias: "Stock Pot Inn"},
                    {node: "Stock Pot Inn (from Mother Conversation)", alias: "Stock Pot Inn"},
                    {node: "Generic Grotto (from Termina Field Pillar)", alias: "Generic Grotto (from Termina Field Pillar)"},
                    {node: "Clock Tower (from Pre Clock Tower)", alias: "Clock Tower"},
                    {node: "Clock Tower (from South Clock Town)", alias: "Clock Tower"},
                    {node: "Clock Tower (from Moon Crash)", alias: "Clock Tower"},
                    {node: "Clock Tower (from Deku Mask)", alias: "Clock Tower"},
                    {node: "Woods of Mystery", alias: "Woods of Mystery"},
                    {node: "Woods of Mystery (from Generic Grotto)", alias: "Woods of Mystery"},
                    {node: "Stone Tower Trial (from Moon)", alias: "Stone Tower Trial"},
                    {node: "On the Moon", alias: "On the Moon"},
                    {node: "Bomb Shop", alias: "Bomb Shop"},
                    {node: "Gorman Racetrack (from Milk Road)", alias: "Gorman Racetrack"},
                    {node: "Gorman Racetrack (from Milk Road west)", alias: "Gorman Racetrack"},
                    {node: "Goron Racetrack (from Path to Goron Village)", alias: "Goron Racetrack"},
                    {node: "East Clock Town (from Termina Field)", alias: "East Clock Town"},
                    {node: "East Clock Town (from South Clock Town south)", alias: "East Clock Town"},
                    {node: "East Clock Town (from Bomber's Hideout)", alias: "East Clock Town"},
                    {node: "East Clock Town (from South Clock Town north)", alias: "East Clock Town"},
                    {node: "East Clock Town (from Treasure Chest Shop)", alias: "East Clock Town"},
                    {node: "East Clock Town (from North Clock Town)", alias: "East Clock Town"},
                    {node: "East Clock Town (from Honey & Darling)", alias: "East Clock Town"},
                    {node: "East Clock Town (from Mayor's Residence)", alias: "East Clock Town"},
                    {node: "East Clock Town (from Shooting Gallery)", alias: "East Clock Town"},
                    {node: "East Clock Town (from Stock Pot Inn)", alias: "East Clock Town"},
                    {node: "East Clock Town (from Stokc Pot Inn upper)", alias: "East Clock Town"},
                    {node: "East Clock Town (from Milk Bar)", alias: "East Clock Town"},
                    {node: "West Clock Town (from Termina Field)", alias: "West Clock Town"},
                    {node: "West Clock Town (from South Clock Town south)", alias: "West Clock Town"},
                    {node: "West Clock Town (from South Clock Town north)", alias: "West Clock Town"},
                    {node: "West Clock Town (from Swordsman's School)", alias: "West Clock Town"},
                    {node: "West Clock Town (from Curiosity Shop)", alias: "West Clock Town"},
                    {node: "West Clock Town (from Trading Post)", alias: "West Clock Town"},
                    {node: "West Clock Town (from Bomb Shop)", alias: "West Clock Town"},
                    {node: "West Clock Town (from Post Office)", alias: "West Clock Town"},
                    {node: "West Clock Town (from Lottery Shop)", alias: "West Clock Town"},
                    {node: "North Clock Town (from Termina Field)", alias: "North Clock Town"},
                    {node: "North Clock Town (from East Clock Town)", alias: "North Clock Town"},
                    {node: "North Clock Town (from South Clock Town)", alias: "North Clock Town"},
                    {node: "North Clock Town (from Fairy's Fountain)", alias: "North Clock Town"},
                    {node: "North Clock Town (from Deku Playground)", alias: "North Clock Town"},
                    {node: "North Clock Town (from Bombers Hide and Seek)", alias: "North Clock Town"},
                    {node: "North Clock Town (from Old Lady/Blast Mask)", alias: "North Clock Town"},
                    {node: "South Clock Town (from Clock Tower)", alias: "South Clock Town"},
                    {node: "South Clock Town (from Termina Field)", alias: "South Clock Town"},
                    {node: "South Clock Town (from East Clock Town north)", alias: "South Clock Town"},
                    {node: "South Clock Town (from West Clock Town north)", alias: "South Clock Town"},
                    {node: "South Clock Town (from North Clock Town)", alias: "South Clock Town"},
                    {node: "South Clock Town (from West Clock Town south)", alias: "South Clock Town"},
                    {node: "South Clock Town (from Laundry Pool)", alias: "South Clock Town"},
                    {node: "South Clock Town (from East Clock Town south)", alias: "South Clock Town"},
                    {node: "South Clock Town (from Song of Soaring)", alias: "South Clock Town"},
                    {node: "Laundry Pool (from South Clock Town)", alias: "Laundry Pool"},
                    {node: "Laundry Pool (from Back Room)", alias: "Laundry Pool"},
                    {node: "Generic Grotto (from Path to Ikana Canyon)", alias: "Generic Grotto (from Path to Ikana Canyon)"},
                    {node: "Generic Grotto (from Ikana Graveyard)", alias: "Generic Grotto (from Ikana Graveyard)"},
                    {node: "Generic Grotto (from Ikana Canyon)", alias: "Generic Grotto (from Ikana Canyon)"},
                    {node: "Zora Hall (from Zora Cape back)", alias: "Zora Hall"}],
                toLocations: [],
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
            this.setupGraph();
        },
        methods: {
            resetCloseModal() {
                this.openedEdgeIndex = null;
                this.openedNodeIndex = null;
                this.openedNodeName = null;
                this.showDeleteModal = false;
            },
            openModal(edgeIndex, nodeIndex, nodeName) {
                this.openedEdgeIndex = edgeIndex;
                this.openedNodeIndex = nodeIndex;
                this.openedNodeName = nodeName;
                this.showDeleteModal = true;
            },

            findShortestPath() {
                let source = this.selectedShortestPathFrom;
                let target = this.selectedShortestPathTo;
                this.shortestPath = [];

                if (source.alias === target.alias) {
                    this.shortestPath.push({
                        alias: "You are already at " + target.alias,
                        name: "You are already at " + target.alias,
                    });
                    this.selectedShortestPathFrom = {};
                    this.selectedShortestPathTo = {};
                    return;
                }
                let queue = [source],
                    visited = {source: true},
                    predecessor = {},
                    tail = 0;
                while (tail < queue.length) {
                    let node = queue[tail++],  // Pop a vertex off the queue.
                        neighbors = this.graph.adjacencyList[node.alias];
                    // console.log(node)
                    // console.log({node: node});
                    // console.log({neighbors: neighbors});
                    for (let i = 0; i < neighbors.length; ++i) {
                        const edgeNode = neighbors[i];
                        // console.log({edgeNode: edgeNode});
                        if (visited[edgeNode.name]) {
                            continue;
                        }
                        visited[edgeNode.name] = true;
                        if (edgeNode.alias === target.alias) {   // Check if the path is complete.
                            const path = [edgeNode];   // If so, backtrack through the path.
                            while (node && node.alias !== source.alias) {
                                path.push(node);
                                node = predecessor[node.alias];
                            }
                            path.push(source);
                            path.reverse();
                            // console.log(path);
                            this.shortestPath = path;
                            this.selectedShortestPathTo = {};
                            this.selectedShortestPathFrom = {};
                            return;
                        }
                        predecessor[edgeNode.alias] = node;
                        // console.log("Edge " + edgeNode + " came from " + node);
                        queue.push(edgeNode);
                    }
                }
                this.shortestPath.push({
                    node: "There is no known path from " + source.alias + " to " + target.alias,
                    alias: "There is no known path from " + source.alias + " to " + target.alias,
                });
                // console.log("There is no path from " + source.alias + " to " + target.alias);
            },
            setupGraph() {
                this.fromLocations.forEach(location => {
                    if(!this.toLocations.includes(location.alias)){
                        this.toLocations.push(location.alias);
                    }
                });
                this.toLocations.forEach(location=>{
                    this.addNode(location);
                })
                this.graph.nodes = this.toLocations;
                // this.fromLocations.forEach(location => {
                //     if(!this.graph.nodes.includes(location.node)){
                //         this.addNode(location.alias);
                //     }
                // });
                // for (let i = 0; i < this.nodes.length; i++) {
                //     this.addNode(this.nodes[i]);
                // }
                // for (let i = 0; i < this.testEdges.length; i++) {
                //     this.addEdge(this.testEdges[i][1], this.testEdges[i][0]);
                // }
                this.$forceUpdate();
            },
            handleNotificationClose() {
                this.showNotification = false;
                this.message = null;
                this.timeOutId = null;
            },
            removeIndexFromAdjacencyList() {
                this.graph.adjacencyList[this.openedNodeIndex].splice(this.openedEdgeIndex, 1);
                this.resetCloseModal();
                this.$forceUpdate();
            },
            addNode(node) {
                this.graph.nodes.push(node);
                this.graph.adjacencyList[node] = [];
            },
            handleShortestPathFromUpdate(location) {
                if (Object.entries(location).length === 0) {
                    this.selectedShortestPathFrom = {};
                    return;
                }
                if (location.node) {
                    this.selectedShortestPathFrom = location;
                } else {
                    this.selectedShortestPathFrom = {
                        node: location,
                        alias: location,
                    };
                }
            },
            handleShortestPathToUpdate(location) {
                if (Object.entries(location).length === 0) {
                    this.selectedShortestPathTo = {};
                    return;
                }
                if (location.node) {
                    this.selectedShortestPathTo = location;
                } else {
                    this.selectedShortestPathTo = {
                        node: location,
                        alias: location,
                    };
                }
            },
            handleSearchFromUpdate(location) {
                if (Object.entries(location).length === 0) {
                    this.selectedNewFrom = {};
                    return;
                }
                if (location.node) {
                    this.selectedNewFrom = location;
                } else {
                    this.selectedNewFrom = {
                        node: location,
                        alias: location,
                    };
                }
            },
            handleSearchToUpdate(location) {
                if (Object.entries(location).length === 0) {
                    this.selectedNewTo = {};
                    return;
                }
                if (location.node) {
                    this.selectedNewTo = location;
                } else {
                    this.selectedNewTo = {
                        node: location,
                        alias: location,
                    };
                }
            },
            addEdge(node1, node2, weight = 1) {
                if (this.graph.adjacencyList[node1.alias] === undefined) {
                    console.log(node1.alias);
                }
                for (let i = 0; i < this.graph.adjacencyList[node1.alias].length; i++) {
                    if (this.graph.adjacencyList[node1.alias][i].node === node2) {
                        return false;
                    }
                }
                this.graph.adjacencyList[node1.alias].push({alias: node2.alias, name: node2.node, weight: weight});
                return true;
            },
            addLocation() {
                let result = this.addEdge(this.selectedNewTo, this.selectedNewFrom);
                this.showNotification = true;
                if (result) {
                    this.message = "Added New Location. Enter " + this.selectedNewFrom.node + " goes to " + this.selectedNewTo.alias;
                }
                if (this.timeOutId !== null) {
                    clearTimeout(this.timeOutId);
                    this.timeOutId = null;
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
                this.selectedNewFrom = {};
                this.selectedNewTo = {};
            },
        },
    };
</script>

<style scoped>

</style>

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

<!--        <div class="bg-white shadow rounded-lg mt-4">-->
<!--            <div class="px-4 py-5 border-b border-gray-200 sm:px-6">-->
<!--                <h3 class="text-lg leading-6 font-medium text-gray-90">-->
<!--                    Shortest Path-->
<!--                </h3>-->
<!--                <p class="mt-1 text-sm leading-5 text-gray-500">-->
<!--                    Are you lost? Maybe we can find a path for you. Type your location below and where you want to go.-->
<!--                </p>-->
<!--            </div>-->
<!--            <div class="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-600 p-4" role="alert">-->
<!--                <p class="font-bold">-->
<!--                    Warning-->
<!--                </p>-->
<!--                <p>This is an experimental feature and the path provided may be inaccurate.</p>-->
<!--            </div>-->
<!--            <div class="flex mt-4 p-4">-->
<!--                <div class="flex-1 mr-2 relative">-->
<!--                    <SearchLocations label="From" :options="toLocations" :selected-search="selectedShortestPathFrom"-->
<!--                        placeholder="Zora Cape" @selected="handleShortestPathFromUpdate"-->
<!--                    />-->
<!--                </div>-->

<!--                <div class="flex-1 ml-2 relative">-->
<!--                    <SearchLocations label="To" :options="toLocations" :selected-search="selectedShortestPathTo"-->
<!--                        placeholder="Termina Field" @selected="handleShortestPathToUpdate"-->
<!--                    />-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="text-right mt-4 p-4">-->
<!--                <span class="ml-3 inline-flex rounded-md shadow-sm">-->
<!--                    <button type="submit"-->
<!--                        class="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out disabled:opacity-25 disabled:cursor-not-allowed"-->
<!--                        :disabled="Object.entries(selectedShortestPathFrom).length === 0 || Object.entries(selectedShortestPathTo).length === 0" @click="findShortestPath"-->
<!--                    >-->
<!--                        Find Shortest Path-->
<!--                    </button>-->
<!--                </span>-->
<!--            </div>-->
<!--            <div v-if="shortestPath.length" class="p-4">-->
<!--                <div class="flex items-center text-sm leading-5 font-medium mt-4">-->
<!--                    <div v-for="(location, key) in shortestPath" :key="key" class="flex items-center">-->
<!--                        <span class="text-gray-500 hover:text-gray-700 focus:outline-none focus:underline transition duration-150 ease-in-out">{{ location.alias }}</span>-->
<!--                        <svg v-if="key !== shortestPath.length -1" class="flex-shrink-0 mx-2 h-5 w-5 text-gray-400" fill="currentColor"-->
<!--                            viewBox="0 0 20 20"-->
<!--                        >-->
<!--                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>-->
<!--                        </svg>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->

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
                    {node: "Mayor's Residence (from East Clock Town)", to_alias: "Mayor's Residence", from_alias: ""},
                    {node: "Majora's Room", to_alias: "Majora's Room", from_alias: ""},
                    {node: "Magic Hag's Potion Shop (from Southern Swamp)", to_alias: "Magic Hag's Potion Shop", from_alias: ""},
                    {node: "Ranch Barn (from Romani Ranch)", to_alias: "Ranch Barn", from_alias: ""},
                    {node: "Ranch House (from Romani Ranch)", to_alias: "Ranch House", from_alias: ""},
                    {node: "Honey & Darling", to_alias: "Honey & Darling", from_alias: ""},
                    {node: "Beneath the Graveyard (Heart Piece)", to_alias: "Beneath the Graveyard (Heart Piece)", from_alias: ""},
                    {node: "Beneath the Graveyard (Song of Storms)", to_alias: "Beneath the Graveyard (Song of Storms)", from_alias: ""},
                    {node: "Curiosity Shop (from West Clock Town)", to_alias: "Curiosity Shop", from_alias: ""},
                    {node: "Back Room (from Laundry Pool)", to_alias: "Back Room", from_alias: ""},
                    {node: "Generic Grotto (from Path to the Swamp)", to_alias: "Generic Grotto (from Path to the Swamp)", from_alias: ""},
                    {node: "Generic Grotto (from Southern Swamp)", to_alias: "Generic Grotto (from Southern Swamp)", from_alias: ""},
                    {node: "Great Bay Gossip Stones Grotto", to_alias: "Great Bay Gossip Stones Grotto", from_alias: ""},
                    {node: "Swamp Gossip Stones Grotto", to_alias: "Swamp Gossip Stones Grotto", from_alias: ""},
                    {node: "Ikana Gossip Stones Grotto", to_alias: "Ikana Gossip Stones Grotto", from_alias: ""},
                    {node: "Snowhead Gossip Stones Grotto", to_alias: "Snowhead Gossip Stones Grotto", from_alias: ""},
                    {node: "Generic Grotto (from Termina Field Grass)", to_alias: "Generic Grotto (from Termina Field Grass)", from_alias: ""},
                    {node: "Hotspring Water Grotto", to_alias: "Hotspring Water Grotto", from_alias: ""},
                    {node: "Dodongo Grotto", to_alias: "Dodongo Grotto", from_alias: ""},
                    {node: "Bisness Deku Scrub Grotto", to_alias: "Bisness Deku Scrub Grotto", from_alias: ""},
                    {node: "Cow Grotto (from Termina Field)", to_alias: "Cow Grotto (from Termina Field)", from_alias: ""},
                    {node: "Bio Baba Grotto", to_alias: "Bio Baba Grotto", from_alias: ""},
                    {node: "Magic Bean Seller Grotto", to_alias: "Magic Bean Seller Grotto", from_alias: ""},
                    {node: "Peahat Grotto", to_alias: "Peahat Grotto", from_alias: ""},
                    {node: "Lone Peak Shrine", to_alias: "Lone Peak Shrine", from_alias: ""},
                    {node: "Generic Grotto (from Woods of Mystery)", to_alias: "Generic Grotto (from Woods of Mystery)", from_alias: ""},
                    {node: "Generic Grotto (from Path to Goron Village)", to_alias: "Generic Grotto (from Path to Goron Village)", from_alias: ""},
                    {node: "Generic Grotto (from Path to Snowhead)", to_alias: "Generic Grotto (from Path to Snowhead)", from_alias: ""},
                    {node: "Generic Grotto (from Mountain Village)", to_alias: "Generic Grotto (from Mountain Village)", from_alias: ""},
                    {node: "Ikana Canyon (from Path to Ikana)", to_alias: "Ikana Canyon", from_alias: ""},
                    {node: "Ikana Canyon (from Ghost Hut)", to_alias: "Ikana Canyon", from_alias: ""},
                    {node: "Ikana Canyon (from Musicbox House)", to_alias: "Ikana Canyon", from_alias: ""},
                    {node: "Ikana Canyon (from Stone Tower)", to_alias: "Ikana Canyon", from_alias: ""},
                    {node: "Ikana Canyon (from Song of Soaring)", to_alias: "Ikana Canyon", from_alias: ""},
                    {node: "Ikana Canyon (from Beneath the Well)", to_alias: "Ikana Canyon", from_alias: ""},
                    {node: "Ikana Canyon (from Sakon's Hideout)", to_alias: "Ikana Canyon", from_alias: ""},
                    {node: "Ikana Canyon (from Clear Cutscene)", to_alias: "Ikana Canyon", from_alias: ""},
                    {node: "Ikana Canyon (from Ancient Castle of Ikana)", to_alias: "Ikana Canyon", from_alias: ""},
                    {node: "Spring Water Cave (from Farewell to Gibdos)", to_alias: "Spring Water Cave", from_alias: ""},
                    {node: "Ikana Canyon (from Fairy Fountain)", to_alias: "Ikana Canyon", from_alias: ""},
                    {node: "Ikana Canyon (from Secret Shrine)", to_alias: "Ikana Canyon", from_alias: ""},
                    {node: "Ikana Canyon (from Spring Water Cave)", to_alias: "Ikana Canyon", from_alias: ""},
                    {node: "Spring Water Cave (from Ikana Canyon)", to_alias: "Spring Water Cave", from_alias: ""},
                    {node: "Ikana Canyon (from Twinmold)", to_alias: "Ikana Canyon", from_alias: ""},
                    {node: "Ikana Canyon (Generic Grotto)", to_alias: "Ikana Canyon", from_alias: ""},
                    {node: "Pirates' Fortress Interior (from Exterior)", to_alias: "Pirates' Fortress Interior", from_alias: ""},
                    {node: "Pirates' Fortress Interior (from Hookshot Lower)", to_alias: "Pirates' Fortress Interior", from_alias: ""},
                    {node: "Pirates' Fortress Interior (from Hookshot Upper)", to_alias: "Pirates' Fortress Interior", from_alias: ""},
                    {node: "Pirates' Fortress Interior (from Purple Pirate entrance)", to_alias: "Pirates' Fortress Interior", from_alias: ""},
                    {node: "Pirates' Fortress Interior (from Purple Pirate exit)", to_alias: "Pirates' Fortress Interior", from_alias: ""},
                    {node: "Pirates' Fortress Interior (from Green Pirate entrance)", to_alias: "Pirates' Fortress Interior", from_alias: ""},
                    {node: "Pirates' Fortress Interior (from Green Pirate exit)", to_alias: "Pirates' Fortress Interior", from_alias: ""},
                    {node: "Pirates' Fortress Interior (from Red Pirate entrance)", to_alias: "Pirates' Fortress Interior", from_alias: ""},
                    {node: "Pirates' Fortress Interior (from Red Pirate exit)", to_alias: "Pirates' Fortress Interior", from_alias: ""},
                    {node: "Pirates' Fortress Interior (from Exiterior balcony)", to_alias: "Pirates' Fortress Interior", from_alias: ""},
                    {node: "Milk Bar", to_alias: "Milk Bar", from_alias: ""},
                    {node: "Stone Tower Temple", to_alias: "Stone Tower Temple", from_alias: ""},
                    {node: "Treasure Chest Shop", to_alias: "Treasure Chest Shop", from_alias: ""},
                    {node: "Inverted Stone Tower Temple", to_alias: "Inverted Stone Tower Temple", from_alias: ""},
                    {node: "Inverted Stone Tower Temple (Boss Door)", to_alias: "Inverted Stone Tower Temple (Boss Door)", from_alias: ""},
                    {node: "Top of the Clock Tower", to_alias: "Top of the Clock Tower", from_alias: ""},
                    {node: "Pre Clock Tower (from Clock Tower)", to_alias: "Pre Clock Tower", from_alias: ""},
                    {node: "Pre Clock Tower (from Fall to Termina)", to_alias: "Pre Clock Tower", from_alias: ""},
                    {node: "Pre Clock Tower (from Void)", to_alias: "Pre Clock Tower", from_alias: ""},
                    {node: "Woodfall Temple (from Woodfall)", to_alias: "Woodfall Temple", from_alias: ""},
                    {node: "Deku Princess' Room (from Odolwa)", to_alias: "Deku Princess' Room", from_alias: ""},
                    {node: "Deku Princess' Room (from Woodfall)", to_alias: "Deku Princess' Room", from_alias: ""},
                    {node: "Path to Mountain Village (from Termina Field)", to_alias: "Path to Mountain Village", from_alias: ""},
                    {node: "Path to Mountain Village (from Mountain Village)", to_alias: "Path to Mountain Village", from_alias: ""},
                    {node: "Ancient Castle of Ikana (from Beneath the Well)", to_alias: "Ancient Castle of Ikana", from_alias: ""},
                    {node: "Ancient Castle of Ikana (from Ikana Canyon)", to_alias: "Ancient Castle of Ikana", from_alias: ""},
                    {node: "Ancient Castle of Ikana (from Castle Interior)", to_alias: "Ancient Castle of Ikana", from_alias: ""},
                    {node: "Ancient Castle of Ikana (from Castle Exterior)", to_alias: "Ancient Castle of Ikana", from_alias: ""},
                    {node: "Ancient Castle of Ikana (from Keg Hole)", to_alias: "Ancient Castle of Ikana", from_alias: ""},
                    {node: "Ancient Castle of Ikana (from Hole under Block)", to_alias: "Ancient Castle of Ikana", from_alias: ""},
                    {node: "Ancient Castle of Ikana (from Igo's Room)", to_alias: "Ancient Castle of Ikana", from_alias: ""},
                    {node: "Deku Playground", to_alias: "Deku Playground", from_alias: ""},
                    {node: "Odolwa's Room", to_alias: "Odolwa's Room", from_alias: ""},
                    {node: "Shooting Gallery (Clock Town)", to_alias: "Shooting Gallery (Clock Town)", from_alias: ""},
                    {node: "Snowhead Temple", to_alias: "Snowhead Temple", from_alias: ""},
                    {node: "Milk Road (from Termina Field)", to_alias: "Milk Road", from_alias: ""},
                    {node: "Milk Road (from Romani Ranch)", to_alias: "Milk Road", from_alias: ""},
                    {node: "Milk Road (from Gorman Track back)", to_alias: "Milk Road", from_alias: ""},
                    {node: "Milk Road (from Gorman Track)", to_alias: "Milk Road", from_alias: ""},
                    {node: "Milk Road (from Song of Soaring)", to_alias: "Milk Road", from_alias: ""},
                    {node: "Pirates' Fortress Rooms (Hookshot Lower)", to_alias: "Pirates' Fortress Rooms (Hookshot Lower)", from_alias: ""},
                    {node: "Pirates' Fortress Rooms (Hookshot Upper)", to_alias: "Pirates' Fortress Rooms (Hookshot Upper)", from_alias: ""},
                    {node: "Pirates' Fortress Rooms (Purple Pirate entrance)", to_alias: "Pirates' Fortress Rooms (Purple Pirate entrance)", from_alias: ""},
                    {node: "Pirates' Fortress Rooms (Purple Pirate exit)", to_alias: "Pirates' Fortress Rooms (Purple Pirate exit)", from_alias: ""},
                    {node: "Pirates' Fortress Rooms (Green Pirate entrance)", to_alias: "Pirates' Fortress Rooms (Green Pirate entrance)", from_alias: ""},
                    {node: "Pirates' Fortress Rooms (Green Pirate exit)", to_alias: "Pirates' Fortress Rooms (Green Pirate exit)", from_alias: ""},
                    {node: "Pirates' Fortress Rooms (Red Pirate entrance)", to_alias: "Pirates' Fortress Rooms (Red Pirate entrance)", from_alias: ""},
                    {node: "Pirates' Fortress Rooms (Red Pirate exit)", to_alias: "Pirates' Fortress Rooms (Red Pirate exit)", from_alias: ""},
                    {node: "Pirates' Fortress Rooms (Sewers entrance)", to_alias: "Pirates' Fortress Rooms (Sewers entrance)", from_alias: ""},
                    {node: "Pirates' Fortress Rooms (Sewers exit)", to_alias: "Pirates' Fortress Rooms (Sewers exit)", from_alias: ""},
                    {node: "Shooting Gallery (Swamp)", to_alias: "Shooting Gallery (Swamp)", from_alias: ""},
                    {node: "Pinnacle Rock", to_alias: "Pinnacle Rock", from_alias: ""},
                    {node: "Pinnacle Rock (Void)", to_alias: "Pinnacle Rock", from_alias: ""},
                    {node: "Fairy's Fountain (Clock Town)", to_alias: "Fairy's Fountain (Clock Town)", from_alias: ""},
                    {node: "Fairy's Fountain (Woodfall)", to_alias: "Fairy's Fountain (Woodfall)", from_alias: ""},
                    {node: "Fairy's Fountain (Snowhead)", to_alias: "Fairy's Fountain (Snowhead)", from_alias: ""},
                    {node: "Fairy's Fountain (Great Bay)", to_alias: "Fairy's Fountain (Great Bay)", from_alias: ""},
                    {node: "Fairy's Fountain (Ikana)", to_alias: "Fairy's Fountain (Ikana)", from_alias: ""},
                    {node: "Swamp Spider House", to_alias: "Swamp Spider House", from_alias: ""},
                    {node: "Ocean Spider House", to_alias: "Ocean Spider House", from_alias: ""},
                    {node: "Bombers' Hideout", to_alias: "Bombers' Hideout", from_alias: ""},
                    {node: "Observatory (from Termina Field)", to_alias: "Observatory", from_alias: ""},
                    {node: "Woodfall Trial (from Moon)", to_alias: "Woodfall Trial", from_alias: ""},
                    {node: "Deku Palace (from Southern Swamp)", to_alias: "Deku Palace", from_alias: ""},
                    {node: "Deku Palace (from being thrown out)", to_alias: "Deku Palace", from_alias: ""},
                    {node: "Deku Palace (from Deku King's Chamber)", to_alias: "Deku Palace", from_alias: ""},
                    {node: "Deku Palace (from Monkey cage)", to_alias: "Deku Palace", from_alias: ""},
                    {node: "Deku Palace (from Deku Shrine)", to_alias: "Deku Palace", from_alias: ""},
                    {node: "Deku Palace (from Swamp Shortcut)", to_alias: "Deku Palace", from_alias: ""},
                    {node: "Deku Palace (from Magic Bean Seller Grotto)", to_alias: "Deku Palace", from_alias: ""},
                    {node: "Mountain Smithy", to_alias: "Mountain Smithy", from_alias: ""},
                    {node: "Termina Field (from West Clock Town)", to_alias: "Termina Field", from_alias: ""},
                    {node: "Termina Field (from Path to Southern Swamp)", to_alias: "Termina Field", from_alias: ""},
                    {node: "Termina Field (from Great Bay Coast)", to_alias: "Termina Field", from_alias: ""},
                    {node: "Termina Field (from Path to Mountain Village)", to_alias: "Termina Field", from_alias: ""},
                    {node: "Termina Field (from Path to Ikana Canyon)", to_alias: "Termina Field", from_alias: ""},
                    {node: "Termina Field (from Milk Road)", to_alias: "Termina Field", from_alias: ""},
                    {node: "Termina Field (from South Clock Town)", to_alias: "Termina Field", from_alias: ""},
                    {node: "Termina Field (from East Clock Town)", to_alias: "Termina Field", from_alias: ""},
                    {node: "Termina Field (from North Clock Town)", to_alias: "Termina Field", from_alias: ""},
                    {node: "Termina Field (from Observatory)", to_alias: "Termina Field", from_alias: ""},
                    {node: "Termina Field (from Cow Grotto)", to_alias: "Termina Field", from_alias: ""},
                    {node: "Termina Field (from Milk Road with Cremia)", to_alias: "Termina Field", from_alias: ""},
                    {node: "Termina Field (from Skull Kid Cutscene)", to_alias: "Termina Field", from_alias: ""},
                    {node: "Termina Field (from Grass Generic Grotto)", to_alias: "Termina Field", from_alias: ""},
                    {node: "Termina Field (from Pillar Generic Grotto)", to_alias: "Termina Field", from_alias: ""},
                    {node: "Termina Field (from Business Scrub Grotto)", to_alias: "Termina Field", from_alias: ""},
                    {node: "Termina Field (from Peahat Grotto)", to_alias: "Termina Field", from_alias: ""},
                    {node: "Termina Field (from Dodongo Grotto)", to_alias: "Termina Field", from_alias: ""},
                    {node: "Termina Field (from Biobaba Grotto)", to_alias: "Termina Field", from_alias: ""},
                    {node: "Termina Field (from Swamp Gossips Grotto)", to_alias: "Termina Field", from_alias: ""},
                    {node: "Termina Field (from Mountain Gossips Grotto)", to_alias: "Termina Field", from_alias: ""},
                    {node: "Termina Field (from Ocean Gossips Grotto)", to_alias: "Termina Field", from_alias: ""},
                    {node: "Termina Field (from Canyon Gossips Grotto)", to_alias: "Termina Field", from_alias: ""},
                    {node: "Post Office", to_alias: "Post Office", from_alias: ""},
                    {node: "Marine Research Lab", to_alias: "Marine Research Lab", from_alias: ""},
                    {node: "Beneath the Graveyard (Bottle)", to_alias: "Beneath the Graveyard (Bottle)", from_alias: ""},
                    {node: "Beneath the Graveyard (Dampe's Room)", to_alias: "Beneath the Graveyard (Dampe's Room)", from_alias: ""},
                    {node: "Generic Grotto (from Great Bay Coast)", to_alias: "Generic Grotto (from Great Bay Coast)", from_alias: ""},
                    {node: "Cow Grotto (from Great Bay Coast)", to_alias: "Cow Grotto (from Great Bay Coast)", from_alias: ""},
                    {node: "Goron Shrine (from Goron Village)", to_alias: "Goron Shrine", from_alias: ""},
                    {node: "Goron Shrine (from Goron Shop)", to_alias: "Goron Shrine", from_alias: ""},
                    {node: "Goron Shrine (from Goron Lullaby)", to_alias: "Goron Shrine", from_alias: ""},
                    {node: "Zora Hall (from Zora Cape)", to_alias: "Zora Hall", from_alias: ""},
                    {node: "Zora Hall (from Zora Cape back)", to_alias: "Zora Hall", from_alias: ""},
                    {node: "Zora Hall (from Zora Shop)", to_alias: "Zora Hall", from_alias: ""},
                    {node: "Zora Hall (from Lulu's Room)", to_alias: "Zora Hall", from_alias: ""},
                    {node: "Zora Hall (from Evan's Room)", to_alias: "Zora Hall", from_alias: ""},
                    {node: "Zora Hall (from Japas' Room)", to_alias: "Zora Hall", from_alias: ""},
                    {node: "Zora Hall (from Mikau's Room)", to_alias: "Zora Hall", from_alias: ""},
                    {node: "Zora Hall (from Band Rehearsal)", to_alias: "Zora Hall", from_alias: ""},
                    {node: "Trading Post", to_alias: "Trading Post", from_alias: ""},
                    {node: "Romani Ranch (from Milk Road)", to_alias: "Romani Ranch", from_alias: ""},
                    {node: "Romani Ranch (from Barn)", to_alias: "Romani Ranch", from_alias: ""},
                    {node: "Romani Ranch (from House)", to_alias: "Romani Ranch", from_alias: ""},
                    {node: "Romani Ranch (from Cucco Shack)", to_alias: "Romani Ranch", from_alias: ""},
                    {node: "Romani Ranch (from Doggy Racetrack)", to_alias: "Romani Ranch", from_alias: ""},
                    {node: "Romani Ranch (from Receiving Milk Bottle)", to_alias: "Romani Ranch", from_alias: ""},
                    {node: "Romani Ranch (from Failing Cart Ride)", to_alias: "Romani Ranch", from_alias: ""},
                    {node: "Romani Ranch (from Romani being abducted)", to_alias: "Romani Ranch", from_alias: ""},
                    {node: "Twinmold's Room", to_alias: "Twinmold's Room", from_alias: ""},
                    {node: "Great Bay Coast (from Termina Field)", to_alias: "Great Bay Coast", from_alias: ""},
                    {node: "Great Bay Coast (from Zora Cape)", to_alias: "Great Bay Coast", from_alias: ""},
                    {node: "Great Bay Coast (from Murky Water Left)", to_alias: "Great Bay Coast", from_alias: ""},
                    {node: "Great Bay Coast (from Pinnacle Rock)", to_alias: "Great Bay Coast", from_alias: ""},
                    {node: "Great Bay Coast (from Fisherman's Hut)", to_alias: "Great Bay Coast", from_alias: ""},
                    {node: "Great Bay Coast (from Pirates' Fortress)", to_alias: "Great Bay Coast", from_alias: ""},
                    {node: "Great Bay Coast (from Murky Water Right)", to_alias: "Great Bay Coast", from_alias: ""},
                    {node: "Great Bay Coast (from Marine Research Lab)", to_alias: "Great Bay Coast", from_alias: ""},
                    {node: "Great Bay Coast (from Oceanside Spider House)", to_alias: "Great Bay Coast", from_alias: ""},
                    {node: "Great Bay Coast (from Zora Mask Cutscene)", to_alias: "Great Bay Coast", from_alias: ""},
                    {node: "Great Bay Coast (from Song of Soaring)", to_alias: "Great Bay Coast", from_alias: ""},
                    {node: "Great Bay Coast (from Pirates' Fortress caught)", to_alias: "Great Bay Coast", from_alias: ""},
                    {node: "Great Bay Coast (from Generic Grotto)", to_alias: "Great Bay Coast", from_alias: ""},
                    {node: "Great Bay Coast (from Cow Grotto)", to_alias: "Great Bay Coast", from_alias: ""},
                    {node: "Zora Cape (from Great Bay Coast)", to_alias: "Zora Cape", from_alias: ""},
                    {node: "Zora Cape (from Zora Hall)", to_alias: "Zora Cape", from_alias: ""},
                    {node: "Zora Cape (from Zora Hall back)", to_alias: "Zora Cape", from_alias: ""},
                    {node: "Zora Cape (from Murky Water)", to_alias: "Zora Cape", from_alias: ""},
                    {node: "Zora Cape (from Waterfall Rapids)", to_alias: "Zora Cape", from_alias: ""},
                    {node: "Zora Cape (from Fairy's Fountain)", to_alias: "Zora Cape", from_alias: ""},
                    {node: "Zora Cape (from Song of Soaring)", to_alias: "Zora Cape", from_alias: ""},
                    {node: "Zora Cape (from Great Bay Temple)", to_alias: "Zora Cape", from_alias: ""},
                    {node: "Zora Cape (from Gyorg)", to_alias: "Zora Cape", from_alias: ""},
                    {node: "Zora Cape (from Gyorg) (2)", to_alias: "Zora Cape", from_alias: ""},
                    {node: "Zora Cape (from Generic Grotto)", to_alias: "Zora Cape", from_alias: ""},
                    {node: "Lottery Shop", to_alias: "Lottery Shop", from_alias: ""},
                    {node: "Generic Grotto (from Zora Cape)", to_alias: "Generic Grotto (from Zora Cape)", from_alias: ""},
                    {node: "Pirates' Fortress Exterior (from Great Bay Coast)", to_alias: "Pirates' Fortress Exterior", from_alias: ""},
                    {node: "Pirates' Fortress Exterior (from Interior)", to_alias: "Pirates' Fortress Exterior", from_alias: ""},
                    {node: "Pirates' Fortress Exterior (from Water Tunnel)", to_alias: "Pirates' Fortress Exterior", from_alias: ""},
                    {node: "Pirates' Fortress Exterior (from Sewers Draft)", to_alias: "Pirates' Fortress Exterior", from_alias: ""},
                    {node: "Pirates' Fortress Exterior (from Interior Thrown Out)", to_alias: "Pirates' Fortress Exterior", from_alias: ""},
                    {node: "Pirates' Fortress Exterior (from Interior Balcony)", to_alias: "Pirates' Fortress Exterior", from_alias: ""},
                    {node: "Pirates' Fortress Exterior (from Telescope)", to_alias: "Pirates' Fortress Exterior", from_alias: ""},
                    {node: "Fisherman's Hut", to_alias: "Fisherman's Hut", from_alias: ""},
                    {node: "Goron Shop", to_alias: "Goron Shop", from_alias: ""},
                    {node: "Deku King's Chamber (from Deku Palace)", to_alias: "Deku King's Chamber", from_alias: ""},
                    {node: "Deku King's Chamber (from Deku Palace upper)", to_alias: "Deku King's Chamber", from_alias: ""},
                    {node: "Deku King's Chamber (from Returning Deku Princess)", to_alias: "Deku King's Chamber", from_alias: ""},
                    {node: "Snowhead Trial (from Moon)", to_alias: "Snowhead Trial", from_alias: ""},
                    {node: "Path to the Swamp (from Termina Field)", to_alias: "Path to the Swamp", from_alias: ""},
                    {node: "Path to the Swamp (from Southern Swamp)", to_alias: "Path to the Swamp", from_alias: ""},
                    {node: "Path to the Swamp (from Shooting Gallery)", to_alias: "Path to the Swamp", from_alias: ""},
                    {node: "Path to the Swamp (from Generic Grotto)", to_alias: "Path to the Swamp", from_alias: ""},
                    {node: "Doggy Racetrack", to_alias: "Doggy Racetrack", from_alias: ""},
                    {node: "Cucco Shack", to_alias: "Cucco Shack", from_alias: ""},
                    {node: "Ikana Graveyard (from Path to Ikana)", to_alias: "Ikana Graveyard", from_alias: ""},
                    {node: "Ikana Graveyard (from Beneath the Graveyard (Bottle))", to_alias: "Ikana Graveyard", from_alias: ""},
                    {node: "Ikana Graveyard (from Beneath the Graveyard (Heart Piece))", to_alias: "Ikana Graveyard", from_alias: ""},
                    {node: "Ikana Graveyard (from Beneath the Graveyard (Song of Storms))", to_alias: "Ikana Graveyard", from_alias: ""},
                    {node: "Ikana Graveyard (from Dampe's Room)", to_alias: "Ikana Graveyard", from_alias: ""},
                    {node: "Ikana Graveyard (from Generic Grotto)", to_alias: "Ikana Graveyard", from_alias: ""},
                    {node: "Goht's Room", to_alias: "Goht's Room", from_alias: ""},
                    {node: "Southern Swamp (from Path to Swamp)", to_alias: "Southern Swamp", from_alias: ""},
                    {node: "Southern Swamp (from Tourist Information)", to_alias: "Southern Swamp", from_alias: ""},
                    {node: "Southern Swamp (from Woodfall)", to_alias: "Southern Swamp", from_alias: ""},
                    {node: "Southern Swamp (from Deku Palace)", to_alias: "Southern Swamp", from_alias: ""},
                    {node: "Southern Swamp (from Deku Palace Upper)", to_alias: "Southern Swamp", from_alias: ""},
                    {node: "Southern Swamp (from Magic Hag's Potion Shop)", to_alias: "Southern Swamp", from_alias: ""},
                    {node: "Southern Swamp (from Woods of Mystery)", to_alias: "Southern Swamp", from_alias: ""},
                    {node: "Southern Swamp (from Swamp Spider House)", to_alias: "Southern Swamp", from_alias: ""},
                    {node: "Southern Swamp (from Ikana Canyon)", to_alias: "Southern Swamp", from_alias: ""},
                    {node: "Southern Swamp (from Song of Soaring)", to_alias: "Southern Swamp", from_alias: ""},
                    {node: "Southern Swamp (from Generic Grotto)", to_alias: "Southern Swamp", from_alias: ""},
                    {node: "Woodfall (from Southern Swamp)", to_alias: "Woodfall", from_alias: ""},
                    {node: "Woodfall (from Woodfall Temple)", to_alias: "Woodfall", from_alias: ""},
                    {node: "Woodfall (from Fairy's Fountain)", to_alias: "Woodfall", from_alias: ""},
                    {node: "Woodfall (from Woodfall Temple back)", to_alias: "Woodfall", from_alias: ""},
                    {node: "Woodfall (from Song of Soaring)", to_alias: "Woodfall", from_alias: ""},
                    {node: "Great Bay Trial (from Moon)", to_alias: "Great Bay Trial", from_alias: ""},
                    {node: "Great Bay Trial (from Murky Water)", to_alias: "Great Bay Trial", from_alias: ""},
                    {node: "Great Bay Temple (from Zora Cape)", to_alias: "Great Bay Temple", from_alias: ""},
                    {node: "Waterfall Rapids (from Zora Cape)", to_alias: "Waterfall Rapids", from_alias: ""},
                    {node: "Beneath the Well (from Ikana Canyon)", to_alias: "Beneath the Well", from_alias: ""},
                    {node: "Beneath the Well (from Ancient Castle of Ikana)", to_alias: "Beneath the Well", from_alias: ""},
                    {node: "Mikau's Room (from Zora Hall)", to_alias: "Mikau's Room", from_alias: ""},
                    {node: "Japas' Room (from Zora Hall)", to_alias: "Japas' Room", from_alias: ""},
                    {node: "Lulu's Room (from Zora Hall)", to_alias: "Lulu's Room", from_alias: ""},
                    {node: "Evan's Room (from Zora Hall)", to_alias: "Evan's Room", from_alias: ""},
                    {node: "Japas' Room (from Jam Session)", to_alias: "Japas' Room", from_alias: ""},
                    {node: "Zora Shop", to_alias: "Zora Sho", from_alias: ""},
                    {node: "Goron Village (from Path to Goron Village)", to_alias: "Goron Village", from_alias: ""},
                    {node: "Goron Village (from Goron Shrine)", to_alias: "Goron Village", from_alias: ""},
                    {node: "Goron Village (from Lone Peak Shrine)", to_alias: "Goron Village", from_alias: ""},
                    {node: "Goron Graveyard (from Mountain Village)", to_alias: "Goron Graveyard", from_alias: ""},
                    {node: "Sakon's Hideout", to_alias: "Sakon's Hideout", from_alias: ""},
                    {node: "Mountain Village (from Mountain Smithy)", to_alias: "Mountain Village", from_alias: ""},
                    {node: "Mountain Village (from Path to Goron Village)", to_alias: "Mountain Village", from_alias: ""},
                    {node: "Mountain Village (from Goron Graveyard)", to_alias: "Mountain Village", from_alias: ""},
                    {node: "Mountain Village (from Path to Snowhead)", to_alias: "Mountain Village", from_alias: ""},
                    {node: "Mountain Village (from Generic Grotto)", to_alias: "Mountain Village", from_alias: ""},
                    {node: "Mountain Village (from Path to Mountain Village)", to_alias: "Mountain Village", from_alias: ""},
                    {node: "Mountain Village (from Goht)", to_alias: "Mountain Village", from_alias: ""},
                    {node: "Mountain Village (from Song of Soaring)", to_alias: "Mountain Village", from_alias: ""},
                    {node: "Ghost Hut (from Ikana Canyon)", to_alias: "Ghost Hut", from_alias: ""},
                    {node: "Deku Shrine", to_alias: "Deku Shrine", from_alias: ""},
                    {node: "Path to Ikana (from Termina Field)", to_alias: "Path to Ikana", from_alias: ""},
                    {node: "Path to Ikana (from Ikana Graveyard)", to_alias: "Path to Ikana", from_alias: ""},
                    {node: "Path to Ikana (from Ikana Canyon)", to_alias: "Path to Ikana", from_alias: ""},
                    {node: "Path to Ikana (from Generic Grotto)", to_alias: "Path to Ikana", from_alias: ""},
                    {node: "Swordsman's School", to_alias: "Swordsman's School", from_alias: ""},
                    {node: "Music Box House", to_alias: "Music Box House", from_alias: ""},
                    {node: "Igos du Ikana's Room", to_alias: "Igos du Ikana's Room", from_alias: ""},
                    {node: "Tourist Information", to_alias: "Tourist Information", from_alias: ""},
                    {node: "Tourist Information (from Boat Cruise Picture)", to_alias: "Tourist Information", from_alias: ""},
                    {node: "Stone Tower (from Ikana Canyon)", to_alias: "Stone Tower", from_alias: ""},
                    {node: "Stone Tower (from Un-inverting)", to_alias: "Stone Tower", from_alias: ""},
                    {node: "Stone Tower (from Stone Tower Temple)", to_alias: "Stone Tower", from_alias: ""},
                    {node: "Stone Tower (from Song of Soaring)", to_alias: "Stone Tower", from_alias: ""},
                    {node: "Inverted Stone Tower (from Inverting)", to_alias: "Inverted Stone Tower", from_alias: ""},
                    {node: "Inverted Stone Tower (from Inverted Stone Tower Temple)", to_alias: "Inverted Stone Tower", from_alias: ""},
                    {node: "Path to Snowhead (from Mountain Village)", to_alias: "Path to Snowhead", from_alias: ""},
                    {node: "Path to Snowhead (from Snowhead)", to_alias: "Path to Snowhead", from_alias: ""},
                    {node: "Path to Snowhead (from Generic Grotto)", to_alias: "Path to Snowhead", from_alias: ""},
                    {node: "Snowhead (from Path to Snowhead/Void)", to_alias: "Snowhead", from_alias: ""},
                    {node: "Snowhead (from Snowhead Temple)", to_alias: "Snowhead", from_alias: ""},
                    {node: "Snowhead (from Fairy's Fountain)", to_alias: "Snowhead", from_alias: ""},
                    {node: "Snowhead (from Song of Soaring)", to_alias: "Snowhead", from_alias: ""},
                    {node: "Path to Goron Village (from Mountain Village)", to_alias: "Path to Goron Village", from_alias: ""},
                    {node: "Path to Goron Village (from Goron Village)", to_alias: "Path to Goron Village", from_alias: ""},
                    {node: "Path to Goron Village (from Goron Racetrack)", to_alias: "Path to Goron Village", from_alias: ""},
                    {node: "Path to Goron Village (from Generic Grotto)", to_alias: "Path to Goron Village", from_alias: ""},
                    {node: "Path to Goron Village (from Hotspring Grotto)", to_alias: "Path to Goron Village", from_alias: ""},
                    {node: "Gyorg's Room", to_alias: "Gyorg's Room", from_alias: ""},
                    {node: "Secret Shrine", to_alias: "Secret Shrine", from_alias: ""},
                    {node: "Stock Pot Inn (from East Clock Town)", to_alias: "Stock Pot Inn", from_alias: ""},
                    {node: "Stock Pot Inn (from East Clock Town upper)", to_alias: "Stock Pot Inn", from_alias: ""},
                    {node: "Stock Pot Inn (from Midnight Meeting)", to_alias: "Stock Pot Inn", from_alias: ""},
                    {node: "Stock Pot Inn (from Mother Conversation)", to_alias: "Stock Pot Inn", from_alias: ""},
                    {node: "Generic Grotto (from Termina Field Pillar)", to_alias: "Generic Grotto (from Termina Field Pillar)", from_alias: ""},
                    {node: "Clock Tower (from Pre Clock Tower)", to_alias: "Clock Tower", from_alias: ""},
                    {node: "Clock Tower (from South Clock Town)", to_alias: "Clock Tower", from_alias: ""},
                    {node: "Clock Tower (from Moon Crash)", to_alias: "Clock Tower", from_alias: ""},
                    {node: "Clock Tower (from Deku Mask)", to_alias: "Clock Tower", from_alias: ""},
                    {node: "Woods of Mystery", to_alias: "Woods of Mystery", from_alias: ""},
                    {node: "Woods of Mystery (from Generic Grotto)", to_alias: "Woods of Mystery", from_alias: ""},
                    {node: "Stone Tower Trial (from Moon)", to_alias: "Stone Tower Trial", from_alias: ""},
                    {node: "On the Moon", to_alias: "On the Moon", from_alias: ""},
                    {node: "Bomb Shop", to_alias: "Bomb Shop", from_alias: ""},
                    {node: "Gorman Racetrack (from Milk Road)", to_alias: "Gorman Racetrack", from_alias: ""},
                    {node: "Gorman Racetrack (from Milk Road west)", to_alias: "Gorman Racetrack", from_alias: ""},
                    {node: "Goron Racetrack (from Path to Goron Village)", to_alias: "Goron Racetrack", from_alias: ""},
                    {node: "East Clock Town (from Termina Field)", to_alias: "East Clock Town", from_alias: ""},
                    {node: "East Clock Town (from South Clock Town south)", to_alias: "East Clock Town", from_alias: ""},
                    {node: "East Clock Town (from Bomber's Hideout)", to_alias: "East Clock Town", from_alias: ""},
                    {node: "East Clock Town (from South Clock Town north)", to_alias: "East Clock Town", from_alias: ""},
                    {node: "East Clock Town (from Treasure Chest Shop)", to_alias: "East Clock Town", from_alias: ""},
                    {node: "East Clock Town (from North Clock Town)", to_alias: "East Clock Town", from_alias: ""},
                    {node: "East Clock Town (from Honey & Darling)", to_alias: "East Clock Town", from_alias: ""},
                    {node: "East Clock Town (from Mayor's Residence)", to_alias: "East Clock Town", from_alias: ""},
                    {node: "East Clock Town (from Shooting Gallery)", to_alias: "East Clock Town", from_alias: ""},
                    {node: "East Clock Town (from Stock Pot Inn)", to_alias: "East Clock Town", from_alias: ""},
                    {node: "East Clock Town (from Stokc Pot Inn upper)", to_alias: "East Clock Town", from_alias: ""},
                    {node: "East Clock Town (from Milk Bar)", to_alias: "East Clock Town", from_alias: ""},
                    {node: "West Clock Town (from Termina Field)", to_alias: "West Clock Town", from_alias: ""},
                    {node: "West Clock Town (from South Clock Town south)", to_alias: "West Clock Town", from_alias: ""},
                    {node: "West Clock Town (from South Clock Town north)", to_alias: "West Clock Town", from_alias: ""},
                    {node: "West Clock Town (from Swordsman's School)", to_alias: "West Clock Town", from_alias: ""},
                    {node: "West Clock Town (from Curiosity Shop)", to_alias: "West Clock Town", from_alias: ""},
                    {node: "West Clock Town (from Trading Post)", to_alias: "West Clock Town", from_alias: ""},
                    {node: "West Clock Town (from Bomb Shop)", to_alias: "West Clock Town", from_alias: ""},
                    {node: "West Clock Town (from Post Office)", to_alias: "West Clock Town", from_alias: ""},
                    {node: "West Clock Town (from Lottery Shop)", to_alias: "West Clock Town", from_alias: ""},
                    {node: "North Clock Town (from Termina Field)", to_alias: "North Clock Town", from_alias: ""},
                    {node: "North Clock Town (from East Clock Town)", to_alias: "North Clock Town", from_alias: ""},
                    {node: "North Clock Town (from South Clock Town)", to_alias: "North Clock Town", from_alias: ""},
                    {node: "North Clock Town (from Fairy's Fountain)", to_alias: "North Clock Town", from_alias: ""},
                    {node: "North Clock Town (from Deku Playground)", to_alias: "North Clock Town", from_alias: ""},
                    {node: "North Clock Town (from Bombers Hide and Seek)", to_alias: "North Clock Town", from_alias: ""},
                    {node: "North Clock Town (from Old Lady/Blast Mask)", to_alias: "North Clock Town", from_alias: ""},
                    {node: "South Clock Town (from Clock Tower)", to_alias: "South Clock Town", from_alias: ""},
                    {node: "South Clock Town (from Termina Field)", to_alias: "South Clock Town", from_alias: ""},
                    {node: "South Clock Town (from East Clock Town north)", to_alias: "South Clock Town", from_alias: ""},
                    {node: "South Clock Town (from West Clock Town north)", to_alias: "South Clock Town", from_alias: ""},
                    {node: "South Clock Town (from North Clock Town)", to_alias: "South Clock Town", from_alias: ""},
                    {node: "South Clock Town (from West Clock Town south)", to_alias: "South Clock Town", from_alias: ""},
                    {node: "South Clock Town (from Laundry Pool)", to_alias: "South Clock Town", from_alias: ""},
                    {node: "South Clock Town (from East Clock Town south)", to_alias: "South Clock Town", from_alias: ""},
                    {node: "South Clock Town (from Song of Soaring)", to_alias: "South Clock Town", from_alias: ""},
                    {node: "Laundry Pool (from South Clock Town)", to_alias: "Laundry Pool", from_alias: ""},
                    {node: "Laundry Pool (from Back Room)", to_alias: "Laundry Pool", from_alias: ""},
                    {node: "Generic Grotto (from Path to Ikana Canyon)", to_alias: "Generic Grotto (from Path to Ikana Canyon)", from_alias: ""},
                    {node: "Generic Grotto (from Ikana Graveyard)", to_alias: "Generic Grotto (from Ikana Graveyard)", from_alias: ""},
                    {node: "Generic Grotto (from Ikana Canyon)", to_alias: "Generic Grotto (from Ikana Canyon)", from_alias: ""},
                    {node: "Zora Hall (from Zora Cape back)", to_alias: "Zora Hall", from_alias: ""},
                ],
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
                this.generateToLocations();
                this.generateNodes();
                // this.generateFromLocations();
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
            generateFromLocations(){
                this.fromLocations.forEach(location=>{
                    if(location.node.includes("(from ")){
                        if(location.node.includes("Old Lady/Blast Mask") || location.node.includes("Bombers Hide and Seek")){
                            location.from_alias ="North Clock Town";
                        }
                        if(location.node.includes("Path to the Swamp (from Shooting Gallery)")){
                            location.from_alias = location.from_alias + " (" + parts[0] + ")".trim();

                        }
                        if(location.node.includes("Gorman Track")){
                            location.from_alias = "Gorman Racetrack"
                        }
                        else {
                            location.from_alias = location.node.split("(from ")[1].split(")")[0].trim();
                        }
                    }
                });
            },
            generateToLocations(){
                this.fromLocations.forEach(location => {
                    if(!this.toLocations.includes(location.to_alias)){
                        this.toLocations.push(location.to_alias);
                    }
                });
            },
            generateNodes(){
                this.toLocations.forEach(location=>{
                    this.addNode(location);
                })
                this.graph.nodes = this.toLocations;
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

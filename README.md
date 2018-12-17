# The Best Shopping platform
### Get Started
#### Install Dexon Extension
1. go to google extension and search for DeKuSan
2. install it
#### Deploy Smart Contracts
1. cp `secret.js.example` to `secret.js` and change the `mnemonic` in it to your passphrases
2. cd to `smart-contracts`, this is where the contracts codes locate
3. type `npm run compile` to compile the contracts codes
4. and you'll get contract abi in `build/contracts/CPlatform.json` file
5. finally type `npm run migrate` to migrate our contract on Dexon

Now your contract has migrated on Dexon

Go to https://testnet.dexscan.app and serach for your contract's address!!
#### React User Interface
1. cd to `react-ui`
2. type `yarn` to install the node packages
3. type `npm start`

The web will automatically open on your localhost


#### How To Test It
* Create a user on our platform
1. connect to your wallet first
2. if this wallet hasn't connect to our platform, it'll help connect it
3. click confirm

* Sell an item
1. Go to `Post` on the web
2. fill the form and sell!

go to home page, and you'll find your item 

* Buy an item
1. click on the image on the item
2. and buy it

the bought item on home page will disappear now

* Deliver an item
1. go to deliver page
2. click `take mission` on the item you want to deliver

now you are a driver, collect the package from the seller now!


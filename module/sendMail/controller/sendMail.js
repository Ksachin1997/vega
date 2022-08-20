const mailjet = require ('node-mailjet').connect('5c5cdb3e042b81dcde4cfe8a5958806a', '3887b5030216058f1952d9568deac76a')

exports.sendMail = async (req,res) => {

    try{

        const data = req.body.data;

        if(!data)
            return res.status(400).send('Bad Request')

        let promiseArr = []

        for(let i=0; i<data.length; i++){

            const name = data[i].name
            const amount = data[i].amount
            const email = data[i].email
            const address = data[i].address

            const request = mailjet
                .post("send", {'version': 'v3.1'})
                .request({
                    "Messages":[
                        {
                        "From": {
                            "Email": "sachin.kumar@vegavid.com",
                            "Name": "Sachin"
                        },
                        "To": [
                            {
                            "Email": email,
                            "Name": name
                            }
                        ],
                        "Subject": "Transaction Success",
                        "TextPart": `Hi,\nAmount ${amount} is transfered successfully to ${address}`,
                        "HTMLPart": `<p>Hi<br><br>Amount ${amount} is transfered successfully to ${address}</p>`,
                        "CustomID": "AppGettingStartedTest"
                        }
                    ]
                })
            
            promiseArr.push(request)

        }

        await Promise.all(promiseArr)

        return res.status(200).send('Mail Sent')

    }catch(err){
        return res.status(500).send('Some Error In Sending Mail')
    }

}
import { AddservicesModel } from "../../../../DB/model/Addservices.js";
import { bagModel } from "../../../../DB/model/bag.js";
import { modelModel } from "../../../../DB/model/model.js";

export const addToBag = async (req, res) => {
  const { modeId, servicesId, itemId ,id} = req.params;
  try {
    console.log(modeId,servicesId,itemId,id)
    const bagItem = await bagModel.findOne({ itemId, madeby: id });
    if (bagItem) {
      const updatedBagItem = await bagModel.findOneAndUpdate(
        { itemId },
        { $inc: { quatity: 1 } },
        { new: true }
      );
      return res.status(200).json({ message: "Quantity increased successfully", updatedBagItem });
    } else {
      const findModel = await modelModel.findById(modeId);
      if (!findModel) {
        return res.status(400).json({ message: "المودل مش موجود" });
      }

      const findService = findModel.servicingUser.find(service => service._id.toString() === servicesId);
      if (!findService) {
        return res.status(404).json({ message: "Service not found in the model" });
      }

      const serviceIndex = findModel.servicingUser.findIndex(service => service._id.toString() === servicesId);
      if (serviceIndex === -1) {
        return res.status(404).json({ message: "Service not found in the model" });
      }

      const dataName = findModel.servicingUser[serviceIndex].user[0].servicesName;
      const dataImage = findModel.servicingUser[serviceIndex].user[0].image;
      const dataPrice = findModel.servicingUser[serviceIndex].user[0].price;

      const newBagItem = {
        services: [{ name: dataName, image: dataImage }],
        quatity: 1,
        price: dataPrice,
        madeby: req.user._id,
        servicesId: servicesId,
        modeId: modeId,
        itemId: itemId
      };

      const createdBagItem = await bagModel.create(newBagItem);
      if (!createdBagItem) {
        return res.status(400).json({ message: "Error adding item to the bag" });
      } else {
        return res.status(200).json({ message: "Item added to the bag successfully", createdBagItem });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: `Error: ${error}` });
  }
}
export const deletFrombag = async (req, res) => {
  const { itemId ,id} = req.params;
  const findBag = await bagModel.findOneAndDelete({ itemId: itemId },{madeby:id});
  if (!findBag) {
    res.status(400).json({ message: "error not founf" })
  } else {
    // const deletBag = await bagModel.findByIdAndDelete(id);
    // if (!deletBag) {
    //   res.status(400).json({ message: "error in delet" })
    // } else {
    console.log('goood')
    res.status(200).json({ message: "delet sucsses", findBag })
  }


}
export const showAll = async (req, res) => {
  try {
    const { madeby } = req.params;
    console.log(madeby)
    const findBag = await bagModel.find({madeby });

    if (!findBag || findBag.length === 0) { 
      res.status(400).json({ message: "مش موجود" });
    } else {
      console.log(findBag)
      res.status(200).json({ message: "sucsses", findBag });
    }
  } catch (error) {
    res.status(500).json({ message: `catch error ${error}` });
  }
};

// export const increaseRequestTimes = async (req, res) => {
//   const { itemId ,id} = req.params;
//   try {
//     // console.log(id);// Find the bag item by its itemId and update the Requesttimes field
//     const bagItem = await bagModel.findOneAndUpdate(
//       { itemId: itemId }, // Query criteria
//       { $inc: { quatity: 1 } }, // Update operation using $inc to increment Requesttimes by 1
//       { new: true } // To return the updated document
//     ,{madeby:id}
//     );
//     // console.log(bagItem);

//     if (!bagItem) {
//       return res.status(404).json({ message: "Item not found in the bag" });
//     }

//     // Send the response with the updated bag item
//     res.status(200).json({ message: "Request times increased successfully", bagItem });
//   } catch (error) {
//     // Handle errors
//     res.status(500).json({ message: `Error: ${error}` });
//   }
// };
export const decreaseRequestTimes = async (req, res) => {
  const { itemId, id } = req.params;
  try {   
     console.log(itemId, id);

    const bagItem = await bagModel.findOne({ itemId, madeby: id });
    if (!bagItem) {console.log('not found');
      return res.status(400).json({ message: "Item not found in the bag" });
    }
    console.log(' found')
    bagItem.quatity--;

    if (bagItem.quatity === 0) {
      console.log('quantity is zero');
      await bagModel.deleteOne({ itemId, madeBy: id }); 
      return res.status(200).json({ message: "Item removed from cart successfully" });
    }

    // Save the updated bag item
    await bagItem.save();

    // Send the response with the updated bag item
    res.status(200).json({ message: "Request times decreased successfully", bagItem });
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// export const getQuatity =  async (req, res) => {
//   const { itemId ,id } = req.params;
//   try {
//     // console.log('id', id)
//     const bagItem = await bagModel.findOne({ itemId,madeBy:id });
//     if (!bagItem) {
//       console.log('Item not found in the bag');
//       return res.status(200).json({ quantity: 1 });
//     } else {
//       console.log('Item found in the bag:', bagItem);
//       res.status(200).json({ quantity: bagItem.quatity });
//     }
//   } catch (error) {
//     res.status(500).json({ message: `Error: ${error}` });
//   }
// };
export const Total = async (req, res) => {
  const { id } = req.params;
  const find=await bagModel.find({madeby:id});
  if (find.length === 0) {
    return res.json({ message: 'Cart is empty' });
  }
  else{
    let totalPrice = 0;
    for (const item of find) {
      totalPrice += item.quatity * item.price;
    }

    res.status(200).json({ totalPrice });
    }
}
export const getUserCart = async (req, res) => {
  const { id } = req.params;
  try {
    const find = await bagModel.find({ madeby: id });
    if (!find) {
      res.status(400).json({ message: 'Cart not found for this user' });
    } else {
      res.status(200).json(find);
    }
  } catch (error) {
    res.status(500).json({ message: `Error: ${error}` });
  }
};

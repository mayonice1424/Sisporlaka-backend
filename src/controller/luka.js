import lukaModel from "../models/lukaModel.js";

export const createNewLuka = async (req, res) => {
  const { keterangan_luka } = req.body;
  try {
  await lukaModel.create({
      keterangan_luka: keterangan_luka,
    }).then((response) => {
    res.status(201).json({
      message: "Luka berhasil dibuat",
      id_luka: response.id_luka
    });
  })} catch (error) {
    res.status(500).json({ error: error.message });  
  }
}

export const getAllLuka = async (req, res) => {
  try {
    const luka = await lukaModel.findAll();
    res.status(200).json({ luka: luka });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getLukaById = async (req, res) => {
  try {
    const { id } = req.params;
    await lukaModel.findOne({
      where: { id_luka: id },
    }).then((response) => {
      res.status(200).json({ luka: response });
    }
    )
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export const deleteLuka = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await lukaModel.destroy({
      where: { id_luka: id },
    });
    if (deleted) {
      return res.status(200).send("Luka deleted");
    }
    throw new Error("Luka not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const updateLuka = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await lukaModel.update(req.body, {
      where: { id_luka: id },
    });
    if (updated) {
      const updatedLuka = await lukaModel.findOne({ where: { id_luka: id } });
      return res.status(200).json({ luka: updatedLuka });
    }
    throw new Error("Luka not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

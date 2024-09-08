import heic2any from 'heic2any'

const convertFileType = async (file: File): Promise<File> => {
  // console.log("heicfile",file)
  if (file.name.toLowerCase().endsWith('.heic')) {
    try {
      const resultBlob: Blob = (await heic2any({
        blob: file,
        toType: 'image/jpg',
      })) as Blob

      const convertedFile = new File([resultBlob], file.name, {
        type: resultBlob.type,
        lastModified: Date.now(),
      })
      return convertedFile
    } catch (e) {
      console.log(e)
      return file
    }
  } else {
    return file
  }
}

const convertFileName = async (file: File): Promise<File> => {
  return new File([file], Date.now() + '-' + file.name, { type: file.type })
}

export const convertFile = async (file: File): Promise<File> => {
  file = await convertFileType(file)
  console.log('done convert file type ', file)
  file = await convertFileName(file)

  return file
}

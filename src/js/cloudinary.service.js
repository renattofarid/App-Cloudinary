const keyCloudinary = 'jcizvive';
const urlCloudinary = 'https://api.cloudinary.com/v1_1/ligthsoft/upload';

const subirImagen = async ( archivoSubir ) => {

    const formData = new FormData();
    formData.append('upload_preset', keyCloudinary );
    formData.append('file', archivoSubir );

    try {
        
        const resp = await fetch(urlCloudinary,{
            method: 'POST',
            body: formData
        });

        if (resp.ok) {
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        } else {
            throw await resp.json();
        }

    } catch (error) {
        
        throw error;

    }

    
}


export {
    subirImagen
}
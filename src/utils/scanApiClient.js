import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

export async function scanCoupon({
    token,
    qrCodes,
    latitude,
    longitude,
    pincode,
    scanMethod = 'M',
    imagePath = null
}) {
    const form = new FormData();

    qrCodes.forEach(code => form.append('qr_codes[]', code));
    form.append('latitude', latitude);
    form.append('longitude', longitude);
    form.append('pincode', pincode);
    form.append('scan_method', scanMethod);

    if (imagePath) {
        form.append('scan_images[]', fs.createReadStream(imagePath));
    }

    const response = await axios.post(
        'https://qa-contractorportal.birlaopus.com/api/v1/scan-coupon',
        form,
        {
            headers: {
                ...form.getHeaders(),
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
}

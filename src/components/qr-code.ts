// import qrCodeSvgRaw from '~/assets/qr-code.svg?raw'
import qrCodeSvg from '~/assets/qr-code.svg'

export default function QrCode() {
  return /* html */ `
    <div class="mx-auto">
      <img src="${qrCodeSvg}" alt="QR Code" class="w-[50svh]" />
    </div>
    `
}

// <!-- <div class="size-[50svh] [&>svg]:w-full [&>svg]:h-full">${qrCodeSvgRaw}</div> -->
// <img src="${qrCodeSvg}" alt="QR Code" class="select-none pointer-events-none w-[50svh]" />

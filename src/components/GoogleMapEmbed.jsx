import React from "react";

export default function GoogleMapEmbed() {
  const embedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.0389135752116!2d78.69599001180619!3d10.808331589297973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf562822955a3%3A0xee23f83f53bd081e!2sAathi%20Arisi%20Angadi!5e0!3m2!1sen!2sin!4v1763705438744!5m2!1sen!2sin";

  return (
    <div className="w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden shadow">
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Aathi Arisi Angadi Map"
        className="w-full h-full"
      />
    </div>
  );
}

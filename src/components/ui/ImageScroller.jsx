import { 
  Marquee, 
  MarqueeContent, 
  MarqueeItem 
} from './kibo-ui/marquee';

export const ImageScroller = () => {
    return (
        <Marquee>
          <MarqueeContent>
            <MarqueeItem><img src="public/vite.svg" alt="1" /></MarqueeItem>
            <MarqueeItem><img src="public/vite.svg" alt="2" /></MarqueeItem>
            <MarqueeItem><img src="public/vite.svg" alt="3" /></MarqueeItem>
          </MarqueeContent>
        </Marquee>
    )
}
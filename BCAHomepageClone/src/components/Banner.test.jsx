import React from 'react';
import {render, fireEvent, cleanup} from '@testing-library/react';
import Banner from './Banner';

afterEach(cleanup);

it('basic jest test', () => {
    expect(true);
});

describe('Banner component', () => {
    const image = {
        url: "/full"
    };

    const tabletImage = {
        url: "/tablet"
    };

    const mobileImage = {
        url: "/mobile"
    };

    const smallMobileImage = {
        url: "/smallMobile"
    };

    const link = {
        url: "http://example.com",
        OpenInNewWindow: true
    };

    const performRender = () => {
        return render(
            <Banner image={image} tabletImage={tabletImage} mobileImage={mobileImage} smallMobileImage={smallMobileImage} rootUrl={"http://example.com"}>
            {<h3>Check your property with</h3>}
            {<h2>Assessment Search</h2>}
            {<h3>and compare it to others</h3>}
            <h3 style={{color: "blue"}}>{"link text"}</h3>
            { 
            link ? 
            <h3><a style={{color: "#0000EE"}} href={link.url} target={link.OpenInNewWindow ? "_blank" : ""}>{link.text}</a></h3> 
            :
              null
            }
          </Banner>
        )
    }

    it('banner text renders successfully', () => {

        const { getByText } = performRender();

        expect(getByText(/Check your/i).textContent).toBe("Check your property with");    
    })

    it('Banner image changes when screen is resized', () => {
        const { container } = performRender();
        
        expect(container.querySelector('[class="bannerlightfamily"]').getAttribute("style")).toBe("background-image: url(http://example.com/full);");
        window.innerWidth = 700;
        fireEvent(window, new Event('resize'));
        expect(container.querySelector('[class="bannerlightfamily"]').getAttribute("style")).toBe("background-image: url(http://example.com/tablet);");
        window.innerWidth = 400;
        fireEvent(window, new Event('resize'));
        expect(container.querySelector('[class="bannerlightfamily"]').getAttribute("style")).toBe("background-image: url(http://example.com/mobile);");
        window.innerWidth = 200;
        fireEvent(window, new Event('resize'));
        expect(container.querySelector('[class="bannerlightfamily"]').getAttribute("style")).toBe("background-image: url(http://example.com/smallMobile);");
    })
});

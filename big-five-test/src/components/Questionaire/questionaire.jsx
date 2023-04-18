import React from 'react';

export default function Questionnaire() {

    function Question({ question, onOptionSelect }) {
        function Button(){
            //This button will allow user to choose one from seven circles to answer the question
            return (
                <button className="w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-900" onClick={() => onOptionSelect('questions')}/>
            );
            
        }

        return (
            <div className="bg-gray-900 text-white py-16">
                <div className="mx-auto max-w-screen-xl px-4 lg:flex lg:h-screen lg:items-center">
                    <div className="mx-auto max-w-3xl text-center">
                        
                        <h2 className="text-2xl font-bold mb-4">Example question: How often do you feel sad?</h2>
                        <div className="flex justify-between items-center">
                            <span>Not accurate</span>
                            <div className="flex flex-row justify-center items-center gap-2">
                                <Button/>
                                <Button/>
                                <Button/>
                                <Button/>
                                <Button/>
                                <Button/>
                                <Button/>
                            </div>
                            <span>Very accurate</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Question/>
    );
};
